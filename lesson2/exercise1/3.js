var express = require('express');
var app = express();

// config

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middleware

app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser('shhhh, very secret'));
app.use(express.session());

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error
    , msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}


app.get('/', function(req,res){
  res.redirect('login');
});

app.get('/login', function(req,res){
  res.render('login');
});

app.get('/restricted', restrict, function(req, res){
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