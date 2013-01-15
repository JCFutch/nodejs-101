var fs = require('fs');
var mime = require('mime');

var handleRequest = function(req, res) {
  var route = req.url;
  if (req.url === '/') { route = '/index.html'; }
  var fullpath = __dirname + '/public' + route;
  var serveRequest = function(err) {
    if (err) { 
      console.log('Error - 404');
      fullpath =  __dirname + '/public/404.html' 
    }
    res.writeHead(200, {'content-type': mime.lookup(fullpath) });
    fs.createReadStream(fullpath).pipe(res);
  }
  if (req.method !== 'GET') { fullpath = __dirname + '/public/501.html'; }
  console.log('Error - 501');
  fs.stat(fullpath, serveRequest);
}
require('http').createServer(handleRequest).listen(3000);
