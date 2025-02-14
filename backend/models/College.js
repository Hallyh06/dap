const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegeId: { 
      type: String, 
      required: true, 
      unique: true 
    }, // Unique identifier for the college

    name: { 
      type: String, 
      required: true 
    },

    description: { 
      type: String, 
      required: true 
    }, // Brief description of the college

    university: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "University", 
      required: true 
    },

    departments: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Department" 
    }]
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
