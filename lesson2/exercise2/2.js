var express = require('express');
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.methodOverride());

app.get('/', function(req,res){
  res.locals.title = 'A Simple Blog'
  res.render('index');
});

app.get('/new', function(req,res){
  res.render('new');
});

app.get('/:id', function(req,res){
  res.render('show');
});

app.get('/:id/edit', function(req,res){
  res.render('edit');
});

app.post('/', function(req,res){
  res.render('index');
})

app.put('/:id', function(req,res){
  res.render('show');
})

app.listen(3000);
console.log('express running on port 3000');