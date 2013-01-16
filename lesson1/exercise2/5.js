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
  request('http://search.twitter.com/search.json', { qs: { q: req.body.query }},
    function(e,r,b) {
      res.send(b);
    })
});

app.listen(3000);