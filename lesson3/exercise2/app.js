var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var request = require('request');

app.configure(function () {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req,res) {
  res.render('index');
});

app.get('/main.html', function (req, res) {
  res.render('main');
});

server.listen(3000);

var apiKey = '78f9e61146e1896735b4fc2f74b5555e';
var currentSong = null;
var dj = null;

function elect (socket) {
  dj = socket;
  io.sockets.emit('announcement', socket.nickname + ' is the new dj');
  socket.emit('elected');
  socket.dj = true;
  socket.on('disconnect', function() {
    dj = null;
    io.sockets.emit('announcment', 'the dj left - next one to join becomes the dj');
  });
}

io.sockets.on('connection', function (socket) {
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');
    if (!dj) {
      elect(socket);
    } else {
      socket.emit('song', currentSong);
    }
  });
  socket.on('song', function (song) {
    if (socket.dj) {
      currentSong = song;
      socket.broadcast.emit('song', song);
    }
  });
  socket.on('search', function (q, fn) {
    request('http://tinysong.com/s/' + 
      encodeURIComponent(q) +
      '?key=' + apiKey +
      '&format=json', {json: true}, function (e,r,b) {
        fn(b);
    });
  });
  socket.on('text', function (msg) {
    socket.broadcast.emit('text', socket.nickname, msg);
  });
});
