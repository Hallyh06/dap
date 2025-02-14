const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  college: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "College", 
    required: true 
},
  programs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Program" 
}],
}, 
{ timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);
