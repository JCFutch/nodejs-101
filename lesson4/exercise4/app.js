var express = require('express');
var app = express();
var config = require('./config.json');
// load model
var entry = require('./entry')(config);

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
  console.log(req.body);
  entry.set('new', req.body, function(err, data) {
    console.log(data);
    if (err) { return res.send(500, err); }
    res.send(200, data);
  });
});

app.get('/api/entries', function(req, res) {
  entry.all(function(data) {
    //console.log(data);
    res.send(200, data);
  });
  
});

app.get('/api/entries/:id', function(req, res) {
  // var query = Entry.findById(req.params.id);
  // query.exec(function(err, data) {
  //   if (err) { return res.send(500, err); }
  //   res.send(200, data);
  // });
});

app.put('/api/entries/:id', function(req, res) {
  // remove keys
  // Entry.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, entry) {
  //   if (err) { return res.send(500, err); }
  //   res.send(200, entry);
  // });
});

app.del('/api/entries/:id', function(req, res) {
  // Entry.remove({ _id: req.params.id}, function(err) {
  //   if (err) { return res.send(500, err); }
  //   res.send(200, 'OK');
  // });
});

app.listen(3000);
