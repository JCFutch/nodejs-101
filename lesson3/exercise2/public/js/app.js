angular.module('app', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', { controller: 'MainCtrl', templateUrl: '/main.html'});
  }])
  .controller('MainCtrl', ['$scope', 'socket', '$window', function($scope, socket, $window) {
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
    };
    
    $scope.addMsg = function() {
      addPost('me', $scope.post);
      socket.emit('text', $scope.post);
      $scope.post = "";
    }

    socket.on('text', addPost);

    function play (song) {
      $('iframe').remove();
      if (!song) return;
      $scope.playing = '<hr><b>Now Playing: </b>' + 
        song.ArtistName + ' ' +
        song.SongName + '<br />';
      var iframe = $window.document.createElement('iframe');
      iframe.frameborder = 0;
      iframe.src = song.Url;
      $('body').append(iframe);
    }
    socket.on('song', play);

    $scope.search = function() {
      socket.emit('search', $scope.query, function(songs) {
        $scope.songs = songs;
      });
    }
    $scope.select = function(song) {
      socket.emit('song', song);
      play(song);
      return false;
    }
  }])
  .factory('socket', ['$rootScope', function ($rootScope) {
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
  }]);
  