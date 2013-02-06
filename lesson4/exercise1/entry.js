// mongoose model
var mongoose = require('mongoose');
var config = require('./config.json');

mongoose.connect(config.db);

var schema = mongoose.Schema({
  occuredAt: Date,
  description: { type: String, required: true },
  points: { type: Number, min: 1 },
  notes: String,
  tags: []
});

schema.path('points').required(true);
schema.path('points').validate(function (value) {
  return value > 0;
}, 'Points must be greater than Zero');

// Entry
module.exports = mongoose.model('Entry', schema);
