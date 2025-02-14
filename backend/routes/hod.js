const express = require('express');
const bcrypt = require('bcrypt');
const HOD = require('../models/HOD');
const router = express.Router();


//had new HOD
router.post('/add', async (req, res) => {
    const { name, email, gender, phone, password, field, academicRank, sequenceNumber, photo } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newHOD = new HOD({ name, email, gender, phone, password: hashedPassword, field, academicRank, sequenceNumber, photo });
    await newHOD.save();
    res.json({ message: 'HOD added successfully' });
});


//view HODs
router.get('/view', async (req, res) => {
    const hods = await HOD.find();
    res.json(hods);
});


//Disable HOD
router.put('/disable/:id', async (req, res) => {
    await HOD.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'HOD disabled successfully' });
});

module.exports =  router;