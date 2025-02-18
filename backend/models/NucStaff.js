const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const NucStaffSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    middlename: {
      type: String,
    },
    lastname: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    emailaddress: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true, // Active by default
    },
    department: {
      type: String,
      default: null,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user who created this staff record
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// **Hash Password before saving**
NucStaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// **Compare Password Method**
NucStaffSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("NucStaff", NucStaffSchema);
