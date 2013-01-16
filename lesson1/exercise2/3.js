var express = require('express');
var ejs = require('ejs');
var app = express();
app.engine('.ejs', ejs.__express);
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
  res.render('index', { title: 'Twitter Search App'});
});

app.listen(3000);