const express = require("express");
const College = require("../models/College");
const router = express.Router();

// Add new college
router.post("/colleges", async (req, res) => {
    const { collegeCode, name, description, deanName } = req.body; // Match frontend request

    try {
        const newCollege = new College({ collegeId: collegeCode, name, description, deanName });

        await newCollege.save();
        res.status(201).json({ message: "College created successfully!" });
    } catch (error) {
        console.error("Error creating college:", error);
        res.status(500).json({ error: "Failed to create college. Please try again." });
    }
});

// Get all colleges
router.get("/colleges", async (req, res) => {
    try {
        const colleges = await College.find();
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ error: "Error fetching colleges" });
    }
});

// Get college by ID
router.get("/colleges/:id", async (req, res) => {
    try {
        const college = await College.findById(req.params.id);
        if (!college) return res.status(404).json({ error: "College not found" });

        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ error: "Error fetching college details" });
    }
});

// Delete college
router.delete("/colleges/:id", async (req, res) => {
    try {
        await College.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "College deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting college" });
    }
});

module.exports = router;
