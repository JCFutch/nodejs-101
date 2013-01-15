var fs = require('fs');
var mime = require('mime');

var handleRequest = function(req, res) {
  var footer = '\n------\nMy Awesome Web Server';
  var route = req.url;
  if (req.url === '/') { route = '/index.html'; }
  var fullpath = __dirname + '/public' + route;
  var serveError = function(code, description) {
    console.log(code + ' - ' + description);
    res.writeHead(code, {'content-type': 'text/plain'});
    res.end(description + footer);
    
  }
  var serveRequest = function(err) {
    if (err) { return serveError(404, 'File Not Found!'); }
    var mimeType = mime.lookup(fullpath);
    res.writeHead(200, {'content-type': mimeType });
    fs.createReadStream(fullpath).pipe(res);
  }

  if (req.method === 'GET') { return fs.stat(fullpath, serveRequest); }
  serveError(501, 'Feature Not Implemented!');
}

require('http').createServer(handleRequest).listen(3000);
