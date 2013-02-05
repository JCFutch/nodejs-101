var express = require('express');
var app = express();

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
})

app.listen(3000);
