const mongoose = require('mongoose');

const gearSchema = new mongoose.Schema({
  category: String,
  items: [String],
});

module.exports = mongoose.model('Gear', gearSchema);