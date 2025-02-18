const mongoose = require('mongoose');

// Define the NucDocument schema
const NucDocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true, // Assuming the status is true by default
    },
    file: {
      fieldname: {
        type: String,  // e.g., "template"
        required: true,
      },
      originalname: {
        type: String,  // e.g., "NEW SELF STUDY FORM (1) (1).doc"
        required: true,
      },
      encoding: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,  // e.g., "application/msword"
        required: true,
      },
      destination: {
        type: String,  // Path where the file is stored (on server)
        required: true,
      },
      filename: {
        type: String,  // File name used to store the file
        required: true,
      },
      path: {
        type: String,  // Full path to access the file
        required: true,
      },
      size: {
        type: Number,  // Size of the file in bytes
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model, assuming users are stored in a 'User' collection
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the NucDocument model
const NucDocument = mongoose.model('NucDocument', NucDocumentSchema);

module.exports = NucDocument;
