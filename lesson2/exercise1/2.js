var express = require('express');
var app = express();

// config

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', function(req,res){
  res.redirect('login');
});

app.get('/login', function(req,res){
  res.locals.message = "";
  res.render('login');
});

app.get('/restricted', function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
  res.redirect('/');
});

app.post('/login', function(req, res){
  res.redirect('login');
});

app.listen(3000);
console.log('express listening on port 3000');