const express = require('express');
const bcrypt = require('bcrypt');
const Program = require('../models/Program');
const router = express.Router();

//adding new program
router.post('/programs', async (req, res) => {
    const { programName, programCode, departmentId } = req.body;
    try {
        const newProgram = new Program({ programName, programCode, departmentId });
        await newProgram.save();
        res.status(201).json({ message: "Program created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error creating program" });
    }
});
