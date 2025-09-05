import express from "express";
import { DocumentController } from "../controllers/document.controller.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { DocumentMiddleware } from "../middlewares/documentMiddleware.js";
import { CreateDocumentDto, UpdateDocumentDto, AssignDocumentDto } from "../dtos/document.dto.js";
import { validateDto } from "../middlewares/validateDto.js";

export class DocumentRoutes {
  constructor() {
    this.router = express.Router();
    this.documentController = new DocumentController();
    this.authMiddleware = new AuthMiddleware();
    this.documentMiddleware = new DocumentMiddleware();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // All routes require authentication
    this.router.use(this.authMiddleware.isAuthenticated);

    // Document metadata (available to all authenticated users)
    this.router.get("/metadata", this.documentController.getDocumentMetadata);

    // Document statistics
    this.router.get("/stats", this.documentController.getDocumentStats);

    // Get users for assignment (Admin/SuperAdmin only)
    this.router.get(
      "/users",
      this.documentMiddleware.isAdminOrSuperAdmin,
      this.documentController.getUsersForAssignment
    );

    // Upload/Create Document (Admin/SuperAdmin only)
    this.router.post(
      "/upload",
      this.documentMiddleware.canUploadDocuments,
      upload.single("document"),
      this.documentMiddleware.validateFileUpload,
      validateDto(CreateDocumentDto),
      this.documentController.createDocument
    );

    // Get my documents (Employee/Intern - their assigned documents)
    this.router.get("/my-documents", this.documentController.getMyDocuments);

    // Get all documents (Admin/SuperAdmin only)
    this.router.get(
      "/all",
      this.documentMiddleware.canViewAllDocuments,
      this.documentController.getAllDocuments
    );

    // Get single document by ID
    this.router.get("/:documentId", this.documentController.getDocumentById);

    // Mark document as viewed (Employee/Intern)
    this.router.patch("/:documentId/view", this.documentController.markAsViewed);

    // Update document (Admin/SuperAdmin only - document owner)
    this.router.put(
      "/:documentId",
      this.documentMiddleware.canManageDocuments,
      validateDto(UpdateDocumentDto),
      this.documentController.updateDocument
    );

    // Assign document to users (Admin/SuperAdmin only - document owner)
    this.router.post(
      "/:documentId/assign",
      this.documentMiddleware.canManageDocuments,
      validateDto(AssignDocumentDto),
      this.documentController.assignDocument
    );

    // Remove user from document (Admin/SuperAdmin only - document owner)
    this.router.delete(
      "/:documentId/users/:userId",
      this.documentMiddleware.canManageDocuments,
      this.documentController.removeUserFromDocument
    );

    // Delete document (Admin/SuperAdmin only - document owner)
    this.router.delete(
      "/:documentId",
      this.documentMiddleware.canManageDocuments,
      this.documentController.deleteDocument
    );
  }

  getRouter() {
    return this.router;
  }
}




