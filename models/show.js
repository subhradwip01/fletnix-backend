const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
  show_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  cast: {
    type: String, 
    required: true
  },
  country: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    required: true
  },
  release_year: {
    type: Number,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  listed_in: {
    type: [String], // Array of strings
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Show', showSchema);
