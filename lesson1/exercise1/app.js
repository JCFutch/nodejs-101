var handleRequest = function(req, res) {
  res.writeHead(501, {'content-type': 'text/plain'});
  res.end('Feature Not Implemented!\n------\nMy Awesome Web Server');
  console.log('foo-bar');
}

require('http').createServer(handleRequest).listen(3000);
