var Sequelize = require('sequelize');
var config = require('./config.json');
var sequelize = new Sequelize(config.db, config.username);

var Entry = module.exports = sequelize.define('Entry', {
  id: { type: Sequelize.INTEGER, autoIncrement: true },
  occuredAt: Sequelize.DATE,
  description: Sequelize.STRING,
  points: Sequelize.INTEGER,
  notes: Sequelize.TEXT,
  tags: Sequelize.TEXT
});

Entry.sync();