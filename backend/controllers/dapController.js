const Dap = require('../models/Dap');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new Dap user
exports.createDap = async (req, res) => {
  try {
    const { fullName, email, phone, password, university, status } = req.body;

    // Check if the email already exists
    const existingDap = await Dap.findOne({ email });
    if (existingDap) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDap = new Dap({
      fullName,
      email,
      phone,
      password: hashedPassword,
      university,
      status
    });

    await newDap.save();
    res.status(201).json({ message: 'Dap user created successfully', newDap });

  } catch (error) {
    res.status(500).json({ message: 'Error creating Dap user', error });
  }
};

// Get all Dap users
exports.getAllDaps = async (req, res) => {
  try {
    const daps = await Dap.find();
    res.status(200).json(daps);
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
