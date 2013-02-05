var initDb = require('couch-init');
var config = require('./config.json');
var async = require('async');

var db = initDb(config.db);

console.log('creating database...');
db.createDb(function(err, result) {
  if (result) {
    db.createViews('entry', [], function(err) {
      console.log('created view');
    });
  }
});
