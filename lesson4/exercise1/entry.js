// mongoose model
var mongoose = require('mongoose');
var config = require('./config.json');

mongoose.connect(config.db);

var schema = mongoose.Schema({
  occuredAt: Date,
  description: String,
  points: Number,
  notes: String,
  tags: []
});

// Entry
module.exports = mongoose.model('Entry', schema);
