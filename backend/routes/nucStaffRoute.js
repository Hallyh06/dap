const express = require('express');
const bcrypt = require('bcrypt');
const NucStaff = require('../models/NucStaff');
const router = express.Router();


router.get("/nuc_staffs", async (req, res) => {
    const { email } = req.query;
  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    try {
      console.log("🔍 Searching for email:", email); // Debug log
  
      // Try exact match first
      let staff = await NucStaff.findOne({ emailaddress: email });
  
      if (!staff) {
        console.log("❌ Exact match not found. Trying case-insensitive search...");
        // Try case-insensitive match
        staff = await NucStaff.findOne({ emailaddress: { $regex: new RegExp(`^${email}$`, "i") } });
      }
  
      if (!staff) {
        console.log("🚨 Staff still not found in database!");
        return res.status(404).json({ message: "Staff not found" });
      }
  
      console.log("✅ Staff found:", staff);
      res.status(200).json(staff);
    } catch (error) {
      console.error("🔥 Error fetching staff:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  