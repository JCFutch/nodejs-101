angular.module('app', ['angular-underscore'])
  .config(function($routeProvider) {
    $routeProvider.
      when('/', { controller: 'MainCtrl', templateUrl: '/views/main.html'});
  })
  .controller('MainCtrl', function($scope, socket) {
    $scope.posts = [];
    $scope.post = "";

    socket.on('connect', function () {
      socket.emit('join', prompt('What is your nickname?'));
    });

    socket.on('announcement', function (msg) {
      $scope.posts.push('<b>ann</b> ' + msg);
    });

    function addPost(from, msg) {
      var msg = '<b>' + from + '</b> ' + msg;
      $scope.posts.push(msg);
      if ($scope.posts.length > 25) {
        $scope.posts.shift();
      }
    };
    
    $scope.addMsg = function() {
      addPost('me', $scope.post);
      socket.emit('text', $scope.post);
      $scope.post = "";
    }

    socket.on('text', addPost);

  })
  .factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });
  