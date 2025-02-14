const mongoose = require('mongoose');

const hodSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  phone: String,
  password: String,
  field: String,
  academicRank: String,
  sequenceNumber: String,
  photo: String,
});

module.exports = mongoose.model('HOD', hodSchema);
