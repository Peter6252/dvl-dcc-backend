
const mongoose = require('mongoose');
const DocumentSchema = new mongoose.Schema({
  title: String,
  category: String,
  filepath: String
});
module.exports = mongoose.model('Document', DocumentSchema);
