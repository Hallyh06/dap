const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    collegeCode: { 
      type: String, 
      required: true, 
      unique: true 
    }, // Unique code for the college

    name: { 
      type: String, 
      required: true 
    },

    deanName: { 
      type: String, 
      required: true 
    }, // Name of the college dean

    description: { 
      type: String, 
      required: true 
    }, // Brief description of the college

    university: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "University", 
      required: true 
    }
  }, 
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);
