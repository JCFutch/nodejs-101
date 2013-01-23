var express = require('express');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req,res){
  res.locals.title = 'A Simple Blog'
  res.render('index');
});

app.listen(3000);
console.log('express running on port 3000');