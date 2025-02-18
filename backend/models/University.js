const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
   },
   code: {
    type: String, 
    required: true
   },
   information: {
    type: String, 
    required: true
   },
   status: {
    type: Boolean, 
    required: true
   }
});

const University = mongoose.model('nuc_universities', UniversitySchema); // Ensure it matches your collection name

module.exports = University;
