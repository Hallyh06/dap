const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Dap = require('../models/Dap'); // Import the Dap model
const router = express.Router();

const JWT_SECRET = 'your_secret_key'; // Change this to a strong secret key

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await Dap.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid email or password' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, status: user.status } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
