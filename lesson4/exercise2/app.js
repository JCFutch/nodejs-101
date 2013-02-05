var express = require('express');
var app = express();
// load model
var Entry = require('./entry');

app.configure(function() {
  // set engine
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  // set basic middleware
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/templates/:page', function(req, res) {
  res.render(['templates', req.params.page].join('/'));
});

app.post('/api/entries', function(req, res) {
  var entry = Entry.build(req.body)
  entry.save().success(function(data) {
      res.send(200, data);
    }).error(function(err) {
      res.send(500, err);
    });
});

app.get('/api/entries', function(req, res) {
  Entry.findAll().success(function(entries) {
    res.send(200, entries);
  }).error(function(err) {
    res.send(500, err);
  })
});

app.get('/api/entries/:id', function(req, res) {
  Entry.find({ where: {id: req.params.id}}).success(function(data) {
    res.send(200, data);
  }).error(function(err) {
    res.send(500, err);
  });
});

app.put('/api/entries/:id', function(req, res) {
  Entry.find({ where: {id: req.params.id}}).success(function(entry) {
    entry.updateAttributes(req.body).success(function() {
      res.send(200, entry);
    }).error(function(err) {
      res.send(500, err);
    });
  });
});

app.del('/api/entries/:id', function(req, res) {
  Entry.find({ where: {id: req.params.id}}).success(function(entry) {
    entry.destroy().success(function() {
      res.send(200, 'OK');
    }).error(function(err) {
      res.send(500, err);
    });
  });
});

app.listen(3000);
