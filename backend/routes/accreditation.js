const express  = require('express') ;
const router = express.Router();
const Accreditation = require('../models/Accreditation');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('formFile'), async (req, res) => {
    const { season, status, program, timeline, sentToHOD } = req.body;
    const newAccreditation = new Accreditation({ formFile: req.file.path, season, status, program, timeline, sentToHOD });
    await newAccreditation.save();
    res.json({ message: 'Accreditation form uploaded successfully' });
});

router.get('/view', async (req, res) => {
    const accreditations = await Accreditation.find().populate('sentToHOD');
    res.json(accreditations);
});


// Route to update sentToHOD status
router.put('/forward/:id', async (req, res) => {
    try {
      const updatedAccreditation = await Accreditation.findByIdAndUpdate(
        req.params.id, 
        { sentToHOD: true }, 
        { new: true }
      );
  
      if (!updatedAccreditation) return res.status(404).json({ error: 'Accreditation not found' });
  
      res.json(updatedAccreditation);
    } catch (error) {
      res.status(500).json({ error: 'Error updating accreditation' });
    }
  });

  


module.exports =  router;