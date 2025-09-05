import { Document } from "../models/Document.js";
import { User } from "../models/User.js";

export class DocumentService {
  async createDocument(dto, file, uploadedBy) {
    // Validate assigned users exist
    const assignedUsers = await User.find({
      _id: { $in: dto.assignedTo },
      role: { $in: ["employee", "intern"] }
    });

    if (assignedUsers.length !== dto.assignedTo.length) {
      throw new Error("One or more assigned users not found or invalid role");
    }

    // Prepare assigned users array
    const assignedToArray = dto.assignedTo.map(userId => ({
      user: userId,
      assignedAt: new Date(),
      viewedAt: null,
      isViewed: false
    }));

    const document = await Document.create({
      title: dto.title,
      description: dto.description,
      documentType: dto.documentType,
      fileUrl: file.path,
      filePublicId: file.filename,
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
      uploadedBy: uploadedBy,
      assignedTo: assignedToArray,
      priority: dto.priority,
      expiryDate: dto.expiryDate,
      tags: dto.tags,
    });

    return await this.getDocumentById(document._id, uploadedBy);
  }

  async getDocumentsByUser(userId, page = 1, limit = 10, filters = {}) {
    const skip = (page - 1) * limit;
    const query = {
      "assignedTo.user": userId,
      status: "active"
    };

    // Apply filters
    if (filters.documentType) {
      query.documentType = filters.documentType;
    }
    if (filters.priority) {
      query.priority = filters.priority;
    }
    if (filters.isViewed !== undefined) {
      query["assignedTo.isViewed"] = filters.isViewed;
    }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } }
      ];
    }

    const documents = await Document.find(query)
      .populate("uploadedBy", "name email role")
      .populate("assignedTo.user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Document.countDocuments(query);

    // Filter assignedTo to show only current user's assignment info
    const formattedDocuments = documents.map(doc => {
      const userAssignment = doc.assignedTo.find(
        assignment => assignment.user._id.toString() === userId.toString()
      );

      return {
        _id: doc._id,
        title: doc.title,
        description: doc.description,
        documentType: doc.documentType,
        fileUrl: doc.fileUrl,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        mimeType: doc.mimeType,
        uploadedBy: doc.uploadedBy,
        priority: doc.priority,
        expiryDate: doc.expiryDate,
        tags: doc.tags,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        assignmentInfo: {
          assignedAt: userAssignment.assignedAt,
          viewedAt: userAssignment.viewedAt,
          isViewed: userAssignment.isViewed
        }
      };
    });

    return {
      documents: formattedDocuments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  async getAllDocuments(page = 1, limit = 100, filters = {}) {
    const skip = (page - 1) * limit;
    const query = { status: { $in: ["active", "archived"] } };

    // Apply filters
    if (filters.documentType) {
      query.documentType = filters.documentType;
    }
    if (filters.priority) {
      query.priority = filters.priority;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.uploadedBy) {
      query.uploadedBy = filters.uploadedBy;
    }
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } }
      ];
    }

    const documents = await Document.find(query)
      .populate("uploadedBy", "name email role")
      .populate("assignedTo.user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Document.countDocuments(query);

    return {
      documents,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  async getDocumentById(documentId, userId) {
    const document = await Document.findById(documentId)
      .populate("uploadedBy", "name email role")
      .populate("assignedTo.user", "name email role");

    if (!document || document.status === "deleted") {
      throw new Error("Document not found");
    }

    return document;
  }

  async markDocumentAsViewed(documentId, userId) {
    const document = await Document.findOneAndUpdate(
      {
        _id: documentId,
        "assignedTo.user": userId,
        "assignedTo.isViewed": false
      },
      {
        $set: {
          "assignedTo.$.viewedAt": new Date(),
          "assignedTo.$.isViewed": true
        }
      },
      { new: true }
    ).populate("uploadedBy", "name email role")
     .populate("assignedTo.user", "name email role");

    if (!document) {
      throw new Error("Document not found or already viewed");
    }

    return document;
  }

  async updateDocument(documentId, dto, uploadedBy) {
    const document = await Document.findOneAndUpdate(
      { _id: documentId, uploadedBy, status: { $ne: "deleted" } },
      { $set: dto },
      { new: true, runValidators: true }
    ).populate("uploadedBy", "name email role")
     .populate("assignedTo.user", "name email role");

    if (!document) {
      throw new Error("Document not found or access denied");
    }

    return document;
  }

  async assignDocumentToUsers(documentId, userIds, uploadedBy) {
    // Validate users exist and have correct roles
    const users = await User.find({
      _id: { $in: userIds },
      role: { $in: ["employee", "intern"] }
    });

    if (users.length !== userIds.length) {
      throw new Error("One or more users not found or invalid role");
    }

    const document = await Document.findOne({
      _id: documentId,
      uploadedBy,
      status: { $ne: "deleted" }
    });

    if (!document) {
      throw new Error("Document not found or access denied");
    }

    // Prepare new assignments
    const newAssignments = userIds
      .filter(userId => !document.assignedTo.some(
        assignment => assignment.user.toString() === userId.toString()
      ))
      .map(userId => ({
        user: userId,
        assignedAt: new Date(),
        viewedAt: null,
        isViewed: false
      }));

    if (newAssignments.length === 0) {
      throw new Error("All users are already assigned to this document");
    }

    document.assignedTo.push(...newAssignments);
    await document.save();

    return await this.getDocumentById(documentId, uploadedBy);
  }

  async removeUserFromDocument(documentId, userId, uploadedBy) {
    const document = await Document.findOneAndUpdate(
      { _id: documentId, uploadedBy, status: { $ne: "deleted" } },
      { $pull: { assignedTo: { user: userId } } },
      { new: true }
    ).populate("uploadedBy", "name email role")
     .populate("assignedTo.user", "name email role");

    if (!document) {
      throw new Error("Document not found or access denied");
    }

    return document;
  }

  async deleteDocument(documentId, uploadedBy) {
    const document = await Document.findOne({
      _id: documentId,
      uploadedBy,
      status: { $ne: "deleted" }
    });

    if (!document) {
      throw new Error("Document not found or access denied");
    }

    // Delete file from Cloudinary
    try {
      await CloudinaryService.deleteFile(document.filePublicId);
    } catch (error) {
      // Log error but don't throw - we still want to mark document as deleted
      console.error("Failed to delete file from Cloudinary:", error.message);
    }

    // Mark as deleted instead of actually deleting
    document.status = "deleted";
    await document.save();

    return { message: "Document deleted successfully" };
  }

  async getDocumentStats(userId = null, role = null) {
    const matchCondition = { status: "active" };
    
    if (role === "employee" || role === "intern") {
      matchCondition["assignedTo.user"] = userId;
    }

    const stats = await Document.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: 1 },
          byType: {
            $push: {
              type: "$documentType",
              priority: "$priority"
            }
          },
          totalViewed: {
            $sum: {
              $size: {
                $filter: {
                  input: "$assignedTo",
                  cond: { $eq: ["$$this.isViewed", true] }
                }
              }
            }
          },
          totalUnviewed: {
            $sum: {
              $size: {
                $filter: {
                  input: "$assignedTo",
                  cond: { $eq: ["$$this.isViewed", false] }
                }
              }
            }
          }
        }
      }
    ]);

    // Count by document type and priority
    const typeStats = {};
    const priorityStats = {};

    if (stats.length > 0) {
      stats[0].byType.forEach(item => {
        typeStats[item.type] = (typeStats[item.type] || 0) + 1;
        priorityStats[item.priority] = (priorityStats[item.priority] || 0) + 1;
      });
    }

    return {
      total: stats[0]?.totalDocuments || 0,
      viewed: stats[0]?.totalViewed || 0,
      unviewed: stats[0]?.totalUnviewed || 0,
      byType: typeStats,
      byPriority: priorityStats
    };
  }
}

export const documentService = new DocumentService();