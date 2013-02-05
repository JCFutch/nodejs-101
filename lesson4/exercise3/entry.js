var Thug = require('thug');
var couchDb = require('thug-couch');
var filters = require('thug-filters');

module.exports = function(config) {
  console.log(config.db);
  var db = couchDb(config.db);
  var entry = new Thug({
    filters: {
      beforeWrite: [
        filters.include('docType', 'entry')
      ]
    },
    methods: {
      all: function(cb) {
        db.all('entries', cb);
      }
    }
  });
  entry.constructor.prototype.read = db.read;
  entry.constructor.prototype.write = db.write;
  entry.constructor.prototype.remove = db.remove;

  return entry;
}