// In your backend routes (e.g., `routes/dashboard.js`):

const express = require('express');
const router = express.Router();
const College = require('../models/College');
const Department = require('../models/Department');
const Program = require('../models/Program');
const DAP = require('../models/Dap');

// Route to fetch dynamic data
router.get('/dashboard', async (req, res) => {
  try {
    // Fetching the DAP name and statistics from MongoDB
    const dap = await DAP.findOne();
    const collegesCount = await College.countDocuments();
    const departmentsCount = await Department.countDocuments();
    const programsCount = await Program.countDocuments();

    // Return the data
    res.json({
      dapName: dap.name,
      collegesCount,
      departmentsCount,
      programsCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
