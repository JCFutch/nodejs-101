angular.module('JournalApp',[])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {controller: 'EntriesCtrl', templateUrl: '/templates/entries'})
      .when('/entries/new', {controller: 'EntryNewCtrl', templateUrl: '/templates/entry-new'})
      .when('/entries/:id', {controller: 'EntryCtrl', templateUrl: '/templates/entry'})
      .when('/entries/:id/edit', {controller: 'EntryEditCtrl', templateUrl: '/templates/entry-edit'})
      ;
  }])
  .controller('EntriesCtrl', ['$scope', 'entries', 'util', function($scope, entries, util) {
    $scope.moment = util.moment;
    $scope.points = 10;
    $scope.entries = [];
    entries.all(function(data) {
      $scope.entries = data;
    });
  }])
  .controller('EntryCtrl', ['$scope', 'entries', '$routeParams', 'util', function($scope, entries, $routeParams, util) {
    $scope.moment = util.moment;
    entries.get($routeParams.id, function(data) {
      $scope.entry = data;
    });
  }])
  .controller('EntryNewCtrl', ['$scope', 'entries', '$location', 'util',
    function($scope, entries, $location, util) {
      $scope.entry = {};
      $scope.entry.occuredAt = util.moment().format('MMM D, YYYY, hh:mm a');
      $scope.create = function(entry) {
        entry.occuredAt = util.moment(entry.occuredAt).toString();
        entry.tags = entry.tags.split(',');
        entries.create(entry, function(data) {
          $location.path('/entries/' + data.id);
        });
      }
    }
  ])
  .controller('EntryEditCtrl', ['$scope', 'entries', '$routeParams', '$location', 'util', 
    function($scope, entries, $routeParams, $location, util) {
      entries.get($routeParams.id, function(data) {
        $scope.entry = data;
      });
      $scope.update = function(entry) {
        entries.update($routeParams.id, entry, function() {
          $location.path('/entries/' + $scope.entry.id);
        });
      }
  }])
  .factory('entries', [ 'util', '$http', function(util, $http) {
    return {
      all: function(cb) {
        $http.get('/api/entries').success(function(data) {
          cb(data);
        });
      },
      get: function(id, cb) {
        $http.get('/api/entries/' + id).success(function(data) {
          cb(data)
        });
      },
      create: function(data, cb) {
        $http.post('/api/entries', data).success(function(result) {
          console.log(result);
          cb(result);
        });
      },
      update: function(id, data, cb) {
        $http.put('/api/entries/' + id, data).success(function(result) {
          cb(result);
        });
      },
      remove: function(id, cb) {
        $http.delete('/api/entries/' + id).success(function(data) {
          cb();
        });
      }
    }
  }])
  .factory('util', function() {
    var util = {};
    util._ = _;
    util.moment = moment;
    return util;
  })
  ;