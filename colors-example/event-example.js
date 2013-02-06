var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Foo() {};
util.inherits(Foo, EventEmitter);

var foo = new Foo();

var listener = foo.on('MESSAGE', function(msg) {
  console.log(msg);
});

foo.emit('MESSAGE', 'Hello World');

foo.removeListener(listener);