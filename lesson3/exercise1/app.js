var express = require('express')
, app = express()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

server.listen(3000);

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

io.sockets.on('connection', function (socket) {
  socket.on('join', function(name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');  
  });
  socket.on('text', function (msg) {
    socket.broadcast.emit('text', socket.nickname, msg);
  });
});
