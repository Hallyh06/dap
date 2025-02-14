const Program = require('../models/Dap');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new Progra,
exports.createProgram = async (req, res) => {
  try {
    const { name, department, college, description, university, status } = req.body;

    // Check if the email already exists
    const existingProgram = await Program.findOne({ name });
    if (existingProgram) {
      return res.status(400).json({ message: 'Program already exists' });
    }


    const newProgram = new Program({
      name,
      department,
      college,
      description,
      university,
      status
    });

    await newProgram.save();
    res.status(201).json({ message: 'Program created successfully', newProgram });

  } catch (error) {
    res.status(500).json({ message: 'Error creating Program', error });
  }
};

// Get all Programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Dap users', error });
  }
};

// Get a single Dap user by ID
exports.getDapById = async (req, res) => {
  try {
    const dap = await Dap.findById(req.params.id);
    if (!dap) {
      return res.status(404).json({ message: 'Dap user not found' });
    }
    res.status(200).json(dap);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Dap user', error });
  }
};

// Update a Dap user
exports.updateDap = async (req, res) => {
  try {
    const { fullName, email, phone, university, status } = req.body;
    
    const updatedDap = await Dap.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
      phone,
      university,
      status
    }, { new: true });

    if (!updatedDap) {
      return res.status(404).json({ message: 'Dap user not found' });
    }

    res.status(200).json({ message: 'Dap user updated successfully', updatedDap });

  } catch (error) {
    res.status(500).json({ message: 'Error updating Dap user', error });
  }
};

// Delete a Dap user
exports.deleteDap = async (req, res) => {
  try {
    const deletedDap = await Dap.findByIdAndDelete(req.params.id);
    if (!deletedDap) {
      return res.status(404).json({ message: 'Dap user not found' });
    }
    res.status(200).json({ message: 'Dap user deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting Dap user', error });
  }
};
