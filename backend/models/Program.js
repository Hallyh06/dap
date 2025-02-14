const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  level: { 
    type: String, 
    enum: ["Undergraduate", "Postgraduate", "Diploma"], 
    required: true 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Department", 
    required: true 
  },
  accreditationStatus: { 
    type: String, 
    enum: ["Accredited", "Pending", "Revoked"], 
    default: "Pending" 
  },
}, 
{ timestamps: true });

module.exports = mongoose.model("Program", programSchema);
