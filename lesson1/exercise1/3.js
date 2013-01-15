var fs = require('fs');

var handleRequest = function(req, res) {
  if(req.method === 'GET') {
    res.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream(__dirname + '/public/index.html').pipe(res);
  } else {
    res.writeHead(501, {'content-type': 'text/plain'});
    res.end('Feature Not Implemented!\n------\nMy Awesome Web Server');
  }
}

require('http').createServer(handleRequest).listen(3000);
