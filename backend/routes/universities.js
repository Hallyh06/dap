const express = require('express');
const router = express.Router();
const University = require('../models/University'); // Ensure this points to the correct model file

// Route to get all universities
router.get('/universities', async (req, res) => {
  try {
    const universities = await University.find({}, 'name'); // Fetch only the university names
    res.json(universities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
