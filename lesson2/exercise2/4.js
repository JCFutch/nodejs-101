var express = require('express');
var app = express();
var _ = require('underscore');

var posts = [{
  id: 'hello_world',
  title: 'hello world',
  body: 'Welcome to Earth!'
}];

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req,res,next){
  res.locals.title = 'A Simple Blog'
  if(!res.locals.message) {
    res.locals.message = '';
  }
  next();
});

app.get('/', function(req,res){
  res.render('index',{ posts: posts});
});

app.get('/new', function(req,res){
  res.locals.title = 'A Simple Blog: New Post'

  res.render('new', { posts: posts});
});

app.get('/:id', function(req,res){
  var post = _.chain(posts).where({id: req.params.id}).first().value();
  res.render('show', {post: post});
});

app.get('/:id/edit', function(req,res){
  var post = _.chain(posts).where({id: req.params.id}).first().value();
  res.render('edit', {post: post});
});

app.post('/', function(req,res){
  req.body.id = req.body.title.toLowerCase().split(' ').join('-');
  posts.push(req.body);
  res.locals.message = '<p>Successfully created post</p>';
  res.redirect('/');
});

app.put('/:id', function(req,res) {
  req.body.id = req.params.id;
  var postIndex = _(posts).pluck('id').indexOf(req.params.id);
  posts[postIndex] = req.body;
  console.log(posts);
  res.redirect('/' + req.params.id);
});

app.listen(3000);
console.log('express running on port 3000');