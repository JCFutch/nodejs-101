var express = require('express');
var ejs = require('ejs');
var request = require('request');
var app = express();
app.engine('.ejs', ejs.__express);
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function(req,res){
  res.render('index', { title: 'Twitter Search App'});
});

app.post('/search', function(req, res) {
  var twitter = 'http://search.twitter.com/search.json';
  request(twitter, { json: true, qs: { q: req.body.query }}, function(e,r,b) {
    if (e) { return res.send(e); }
    res.render('results', { twitter: b, query: req.body.query, title: 'Twitter Search Results' });
  });
});

app.listen(3000);