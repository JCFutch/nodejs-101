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
  var entry = new Entry(req.body);
  entry.save(function(err) {
    if (err) { return res.send(500, err); }
    res.send(200, entry);
  });
});

app.get('/api/entries', function(req, res) {
  var query = Entry.find({});
  query.exec(function(err, entries) {
    if (err) { return res.send(500, err); }
    res.send(200, entries);
  });
});

app.get('/api/entries/:id', function(req, res) {
  var query = Entry.findById(req.params.id);
  query.exec(function(err, data) {
    if (err) { return res.send(500, err); }
    res.send(200, data);
  });
});

app.put('/api/entries/:id', function(req, res) {
  // remove keys
  delete(req.body._v);
  delete(req.body._id);
  Entry.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, entry) {
    if (err) { return res.send(500, err); }
    res.send(200, entry);
  });
});

app.del('/api/entries/:id', function(req, res) {
  Entry.remove({ _id: req.params.id}, function(err) {
    if (err) { return res.send(500, err); }
    res.send(200, 'OK');
  });
});

app.listen(3000);
