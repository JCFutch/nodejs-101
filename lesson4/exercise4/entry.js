var Thug = require('thug');
var filters = require('thug-filters');
var redisDb = require('thug-redis');

module.exports = function(config) {
  config.db.namespace = 'entry';
  var db = redisDb(config.db);
  var entry = new Thug({
    filters: {
      in: [
        db.counter('id')
      ]
    },
    methods: {
      all: db.all
    }
  });

  entry.constructor.prototype.read = db.read;
  entry.constructor.prototype.write = db.write;
  entry.constructor.prototype.remove = db.remove;

  return entry;
}