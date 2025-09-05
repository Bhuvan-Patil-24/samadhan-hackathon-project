import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    documentType: {
      type: String,
      enum: ["offer_letter", "completion_letter", "contract", "policy", "other"],
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    filePublicId: {
      type: String,
      required: true, // Cloudinary public_id for deletion
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      assignedAt: {
        type: Date,
        default: Date.now,
      },
      viewedAt: {
        type: Date,
        default: null,
      },
      isViewed: {
        type: Boolean,
        default: false,
      }
    }],
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  { timestamps: true }
);

// Index for better query performance
documentSchema.index({ "assignedTo.user": 1 });
documentSchema.index({ uploadedBy: 1 });
documentSchema.index({ documentType: 1 });
documentSchema.index({ status: 1 });

export const Document = mongoose.model("Document", documentSchema);