var fs = require('fs');
var mime = require('mime');
var root = __dirname + '/public';

var handleRequest = function(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream(root + req.url + 'index.html').pipe(res);
  } else if (req.method === 'GET') {
    var requestedFile = root + req.url;
    fs.stat(requestedFile, function(err) {
      if (err) {
        console.log('404 - File Not Found: ' + req.url);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        return res.end('File Not Found!');
      }
      var contentType = mime.lookup(root + req.url);
      res.writeHead(200, {'content-type': contentType });
      fs.createReadStream(root + req.url).pipe(res);
    });
  } else {
    console.log('501 - Feature Not Implemented ' + req.method);
    res.writeHead(501, {'Content-Type': 'text/plain'});
    res.end('Not Implemented!');
  }
};

require('http').createServer(handleRequest).listen(3000);
