var request = require('request');
var assert = require('assert');
var jsdom = require('jsdom');
var cssom = require('cssom');
var server = require('../server');

describe('A static web server', function() {
  it('should return feature not implemented!', function(done) {
    request.post('http://localhost:3000/', {json: true}, function(err, res, body) {
      assert.equal(res.statusCode, 501, 
        'should return status code 501 for html but returned ' + res.statusCode);
      assert.equal(res.headers['content-type'], 'text/plain', 
        'should return text/html yet it returned ' + res.headers['content-type']);
      done();
    });
  });

  it('should serve html pages', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      assert.equal(res.statusCode, 200, 
        'should return status code 200 for html but returned ' + res.statusCode);
      assert.equal(res.headers['content-type'], 'text/html', 
        'should return text/html yet it returned ' + res.headers['content-type']);
      done();
    });
  });

  it('should serve index.html', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      jsdom.env(body,["http://code.jquery.com/jquery.js"], function(errors, window) {
        var $ = window.jQuery;
        assert.equal($('.hero-unit h1').text(), 'Static Web Server Demo',
          '.hero-unit h1 should equal `Static Web Server Demo` not ' +
          $('.hero-unit h1').text());
        done();
      });
    });
  });

  it('should serve css pages', function(done) {
    request('http://localhost:3000/bootstrap-combined.min.css', function(err, res, body) {
      assert.equal(res.statusCode, 200, 
        'should return status code 200 for css but returned ' + res.statusCode);
      assert.equal(res.headers['content-type'], 'text/css', 
        'should return text/css yet it returned ' + res.headers['content-type']);
      done();
    });
  });

  it('should serve bootstrap-combined.min.css', function(done) {
    request('http://localhost:3000/bootstrap-combined.min.css', function(err, res, body) {
      assert.equal(cssom.parse(body).cssRules[0].style['0'], 'display',
        'should have a display node');
      done();
    });
  });

  it('should serve js pages', function(done) {
    request('http://localhost:3000/bootstrap.min.js', function(err, res, body) {
      assert.equal(res.statusCode, 200, 
        'should return status code 200 for css but returned ' + res.statusCode);
      assert.equal(res.headers['content-type'], 'application/javascript', 
        'should return application/javascript yet it returned ' + res.headers['content-type']);
      done();
    });
  });
  it('should serve jpg images', function(done) {
    request('http://localhost:3000/Yellow_Happy.jpg', function(err, res, body) {
      assert.equal(res.statusCode, 200, 
        'should return status code 200 for css but returned ' + res.statusCode);
      assert.equal(res.headers['content-type'], 'image/jpeg', 
        'should return image/jpeg yet it returned ' + res.headers['content-type']);
      done();
    });
  });

})

