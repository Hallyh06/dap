const express = require('express');
const bcrypt = require('bcrypt');
const Department = require('../models/Department');
const router = express.Router();

//creating new department
router.post('/departments', async (req, res) => {
    const { departmentName, departmentCode, collegeId } = req.body;
    try {
        const newDepartment = new Department({ departmentName, departmentCode, collegeId });
        await newDepartment.save();
        res.status(201).json({ message: "Department created successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error creating department" });
    }
});
