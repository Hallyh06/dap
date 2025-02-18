const express = require('express');
const NucDocument = require('../models/NucDocument'); // Import the NucDocument model
const router = express.Router();

// Route to fetch all NUC documents
router.get('/api/nuc_documents', async (req, res) => {
  try {
    // Fetch all NUC documents from the database
    const documents = await NucDocument.find();

    // Check if documents are found
    if (documents.length === 0) {
      return res.status(404).json({ message: 'No documents found' });
    }

    // Send the documents as a JSON response
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching NUC documents:', error);
    res.status(500).json({ message: 'Failed to fetch NUC documents' });
  }
});

module.exports = router;
