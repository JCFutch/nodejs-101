var express = require('express');
var app = express();
// load model
var config = require('./config.json');
var entry = require('./entry')(config);
var es = require('event-stream');

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
  entry.set('new', req.body, function(err, data) {
    if (err) { return res.send(500, err); }
    res.send(200, data);
  });
});

app.get('/api/entries', function(req, res) {
  entry.all(function(stream) {
    es.pipeline(
       stream,
       es.parse(),
       es.writeArray(function(err, data) {
         res.send(200, data);
       })
    );
  });
});

app.get('/api/entries/:id', function(req, res) {
  entry.get(req.params.id, function(data) {
    res.send(200, data);
  });
});

app.put('/api/entries/:id', function(req, res) {
  entry.set(req.params.id, req.body, function(data) {
    res.send(200, data);
  });
});

app.del('/api/entries/:id', function(req, res) {
  entry.delete(req.params.id, function(data) {
    res.send(200, 'OK');
  });
});

app.listen(3000);
