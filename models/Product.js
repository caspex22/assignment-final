const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  idBook: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  Realease: {
    type: Number,
    required: true
  }
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;