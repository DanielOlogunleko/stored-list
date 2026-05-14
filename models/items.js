const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
