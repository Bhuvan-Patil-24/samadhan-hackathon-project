import ResponseHandler from "../utils/apiResponse.js";

export class DocumentMiddleware {
  // Check if user is Admin or SuperAdmin
  isAdminOrSuperAdmin(req, res, next) {
    const response = new ResponseHandler(res);
    const allowedRoles = ["admin", "superadmin"];
    
    if (!allowedRoles.includes(req.user?.role)) {
      return response.error(null, "Admin or SuperAdmin access required", 403);
    }
    next();
  }

  // Check if user can upload documents
  canUploadDocuments(req, res, next) {
    const response = new ResponseHandler(res);
    const allowedRoles = ["admin", "superadmin"];
    
    if (!allowedRoles.includes(req.user?.role)) {
      return response.error(null, "Only Admin or SuperAdmin can upload documents", 403);
    }
    next();
  }

  // Check if user can manage documents (update, delete, assign)
  canManageDocuments(req, res, next) {
    const response = new ResponseHandler(res);
    const allowedRoles = ["admin", "superadmin"];
    
    if (!allowedRoles.includes(req.user?.role)) {
      return response.error(null, "Only Admin or SuperAdmin can manage documents", 403);
    }
    next();
  }

  // Check if user can view all documents
  canViewAllDocuments(req, res, next) {
    const response = new ResponseHandler(res);
    const allowedRoles = ["admin", "superadmin"];
    
    if (!allowedRoles.includes(req.user?.role)) {
      return response.error(null, "Only Admin or SuperAdmin can view all documents", 403);
    }
    next();
  }

  // Validate file upload
  validateFileUpload(req, res, next) {
    const response = new ResponseHandler(res);
    
    if (!req.file) {
      return response.error(null, "No file uploaded", 400);
    }

    const maxSize = 10 * 1024 * 1024; 
    if (req.file.size > maxSize) {
      return response.error(null, "File size exceeds 10MB limit", 400);
    }

    next();
  }
}