const express = require('express');
const bcrypt = require('bcrypt');
const College = require('../models/College');
const router = express.Router();


//adding new college
router.post('/colleges', async (req, res) => {
    const { collegeName, collegeCode, deanName } = req.body;
    try {
        const newCollege = new College({ collegeName, collegeCode, deanName });
        await newCollege.save();
        res.status(201).json({ message: "College created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error creating college" });
    }
});
