const mongoose = require("mongoose");

const accreditationSchema = new mongoose.Schema(
  {
    formFile: { 
      type: String, 
      required: [true, "Accreditation form file is required"], 
      trim: true 
    }, 
    season: { 
      type: String, 
      required: [true, "Season is required"], 
      match: [/^\d{4}\/\d{4}$/, "Season must be in format YYYY/YYYY"]
    }, 
    status: { 
      type: String, 
      enum: ["Pending", "Approved", "Rejected"], 
      default: "Pending" 
    }, 
    program: { 
      type: String, 
      required: [true, "Program name is required"], 
      trim: true 
    }, 
    timeline: { 
      type: Date, 
      required: [true, "Accreditation timeline is required"], 
      default: () => new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // Default: 6 months from now
    }, 
    sentToHOD: { 
      type: Boolean, 
      default: false 
    } 
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("Accreditation", accreditationSchema);
