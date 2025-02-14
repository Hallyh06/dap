const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
},
 location: { 
    type: String, 
    required: true 
},
  accreditationStatus: { 
    type: String, 
    enum: ["Accredited", "Pending", "Revoked"], 
    default: "Pending" 
},
  colleges: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "College" }],
}, 
{ timestamps: true });

module.exports = mongoose.model("University", universitySchema);
