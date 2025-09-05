export class CreateDocumentDto {
    constructor({ title, description, documentType, assignedTo, priority, expiryDate, tags }) {
      this.title = title;
      this.description = description;
      this.documentType = documentType;
      this.assignedTo = assignedTo || [];
      this.priority = priority || "medium";
      this.expiryDate = expiryDate;
      this.tags = tags || [];
    }
  
    validate() {
      if (!this.title || this.title.trim().length === 0) {
        throw new Error("Document title is required.");
      }
  
      if (!this.documentType) {
        throw new Error("Document type is required.");
      }
  
      const validDocumentTypes = ["offer_letter", "completion_letter", "contract", "policy", "other"];
      if (!validDocumentTypes.includes(this.documentType)) {
        throw new Error("Invalid document type.");
      }
  
      const validPriorities = ["low", "medium", "high", "urgent"];
      if (!validPriorities.includes(this.priority)) {
        throw new Error("Invalid priority level.");
      }
  
      if (!Array.isArray(this.assignedTo) || this.assignedTo.length === 0) {
        throw new Error("At least one user must be assigned to the document.");
      }
  
      // Validate assignedTo contains valid ObjectIds
      for (const userId of this.assignedTo) {
        if (!userId || typeof userId !== "string" || userId.length !== 24) {
          throw new Error("Invalid user ID in assignedTo array.");
        }
      }
  
      if (this.expiryDate && new Date(this.expiryDate) <= new Date()) {
        throw new Error("Expiry date must be in the future.");
      }
    }
  }
  
  export class UpdateDocumentDto {
    constructor({ title, description, documentType, priority, expiryDate, tags, status }) {
      this.title = title;
      this.description = description;
      this.documentType = documentType;
      this.priority = priority;
      this.expiryDate = expiryDate;
      this.tags = tags;
      this.status = status;
    }
  
    validate() {
      if (this.title !== undefined && (!this.title || this.title.trim().length === 0)) {
        throw new Error("Document title cannot be empty.");
      }
  
      if (this.documentType !== undefined) {
        const validDocumentTypes = ["offer_letter", "completion_letter", "contract", "policy", "other"];
        if (!validDocumentTypes.includes(this.documentType)) {
          throw new Error("Invalid document type.");
        }
      }
  
      if (this.priority !== undefined) {
        const validPriorities = ["low", "medium", "high", "urgent"];
        if (!validPriorities.includes(this.priority)) {
          throw new Error("Invalid priority level.");
        }
      }
  
      if (this.status !== undefined) {
        const validStatuses = ["active", "archived", "deleted"];
        if (!validStatuses.includes(this.status)) {
          throw new Error("Invalid status.");
        }
      }
  
      if (this.expiryDate && new Date(this.expiryDate) <= new Date()) {
        throw new Error("Expiry date must be in the future.");
      }
    }
  }
  
  export class AssignDocumentDto {
    constructor({ userIds }) {
      this.userIds = userIds || [];
    }
  
    validate() {
      if (!Array.isArray(this.userIds) || this.userIds.length === 0) {
        throw new Error("At least one user ID is required.");
      }
  
      for (const userId of this.userIds) {
        if (!userId || typeof userId !== "string" || userId.length !== 24) {
          throw new Error("Invalid user ID in userIds array.");
        }
      }
    }
  }