import { documentService } from "../services/document.service.js";
import ResponseHandler from "../utils/apiResponse.js";

export class DocumentController {
  // Create/Upload Document
  async createDocument(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      if (!req.file) {
        return response.error(null, "No file uploaded", 400);
      }

      const result = await documentService.createDocument(
        req.dto,
        req.file,
        req.user._id
      );
      response.success(result, "Document uploaded successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  // Get Documents for Current User (Employee/Intern)
  async getMyDocuments(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const filters = {
        documentType: req.query.documentType,
        priority: req.query.priority,
        isViewed: req.query.isViewed !== undefined ? req.query.isViewed === 'true' : undefined,
        search: req.query.search
      };

      const result = await documentService.getDocumentsByUser(
        req.user._id,
        page,
        limit,
        filters
      );
      response.success(result, "Documents retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get All Documents (Admin/SuperAdmin)
  async getAllDocuments(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 100;
      const filters = {
        documentType: req.query.documentType,
        priority: req.query.priority,
        status: req.query.status,
        uploadedBy: req.query.uploadedBy,
        search: req.query.search
      };

      const result = await documentService.getAllDocuments(page, limit, filters);
      response.success(result, "All documents retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get Single Document
  async getDocumentById(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId } = req.params;
      const result = await documentService.getDocumentById(documentId, req.user._id);
      
      // Check if user has access to this document
      const hasAccess = 
        req.user.role === "superadmin" ||
        req.user.role === "admin" ||
        result.uploadedBy._id.toString() === req.user._id.toString() ||
        result.assignedTo.some(assignment => 
          assignment.user._id.toString() === req.user._id.toString()
        );

      if (!hasAccess) {
        return response.error(null, "Access denied", 403);
      }

      response.success(result, "Document retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Mark Document as Viewed
  async markAsViewed(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId } = req.params;
      const result = await documentService.markDocumentAsViewed(documentId, req.user._id);
      response.success(result, "Document marked as viewed");
    } catch (error) {
      next(error);
    }
  }

  // Update Document
  async updateDocument(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId } = req.params;
      const result = await documentService.updateDocument(
        documentId,
        req.dto,
        req.user._id
      );
      response.success(result, "Document updated successfully");
    } catch (error) {
      next(error);
    }
  }

  // Assign Document to Users
  async assignDocument(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId } = req.params;
      const result = await documentService.assignDocumentToUsers(
        documentId,
        req.dto.userIds,
        req.user._id
      );
      response.success(result, "Document assigned successfully");
    } catch (error) {
      next(error);
    }
  }

  // Remove User from Document
  async removeUserFromDocument(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId, userId } = req.params;
      const result = await documentService.removeUserFromDocument(
        documentId,
        userId,
        req.user._id
      );
      response.success(result, "User removed from document successfully");
    } catch (error) {
      next(error);
    }
  }

  // Delete Document
  async deleteDocument(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { documentId } = req.params;
      const result = await documentService.deleteDocument(documentId, req.user._id);
      response.success(result, "Document deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get Document Statistics
  async getDocumentStats(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      let userId = null;
      let role = req.user.role;

      // For employees and interns, filter stats by their assigned documents
      if (role === "employee" || role === "intern") {
        userId = req.user._id;
      }

      const result = await documentService.getDocumentStats(userId, role);
      response.success(result, "Document statistics retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get Users for Assignment (Admin/SuperAdmin only)
  async getUsersForAssignment(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const { User } = await import("../models/User.js");
      const users = await User.find(
        { role: { $in: ["employee", "intern"] } },
        { name: 1, email: 1, role: 1 }
      ).sort({ name: 1 });

      response.success({ users }, "Users retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // Get Document Types and Priorities (for dropdowns)
  async getDocumentMetadata(req, res, next) {
    const response = new ResponseHandler(res);
    try {
      const metadata = {
        documentTypes: [
          { value: "offer_letter", label: "Offer Letter" },
          { value: "completion_letter", label: "Completion Letter" },
          { value: "contract", label: "Contract" },
          { value: "policy", label: "Policy" },
          { value: "other", label: "Other" }
        ],
        priorities: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
          { value: "urgent", label: "Urgent" }
        ],
        statuses: [
          { value: "active", label: "Active" },
          { value: "archived", label: "Archived" }
        ]
      };

      response.success(metadata, "Document metadata retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
}