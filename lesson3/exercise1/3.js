var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.configure(function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
  res.render('index');
  //res.sendfile(__dirname + '/index.html');
});

server.listen(3000);

io.sockets.on('connection', function (socket) {
  socket.on('join', function(name) {
    // handle join event
  });
  socket.on('text', function (msg) {
    // handle text event
  });
});