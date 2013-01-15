var fs = require('fs');
var mime = require('mime');

var handleRequest = function(req, res) {
  if(req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    return fs.createReadStream(__dirname + '/public/index.html').pipe(res);
  } else if (req.method === 'GET') {
    fs.stat(__dirname + '/public' + req.url, function(err) {
      if (err) {
        console.log('404 File Not Found!');
        res.writeHead(404, {'content-type': 'text/plain'});
        res.end('File Not Found!\n------\nMy Awesome Web Server');
      } 
      var mimeType = mime.lookup(__dirname + '/public' + req.url);
      res.writeHead(200, {'content-type': mimeType });
      fs.createReadStream(__dirname + '/public' + req.url).pipe(res);
    });
    return;
  }
  res.writeHead(501, {'content-type': 'text/plain'});
  res.end('Feature Not Implemented!\n------\nMy Awesome Web Server');
}

require('http').createServer(handleRequest).listen(3000);
