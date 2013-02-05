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
    $scope.entries = entries;
  }])
  .controller('EntryCtrl', ['$scope', 'entries', '$routeParams', 'util', function($scope, entries, $routeParams, util) {
    $scope.moment = util.moment;
    $scope.entry = util._.findWhere(entries, {_id: $routeParams.id});
  }])
  .controller('EntryNewCtrl', ['$scope', 'entries', '$location', 'util',
    function($scope, entries, $location, util) {
      $scope.entry = {};
      $scope.entry.occuredAt = util.moment().format('MMM D, YYYY, hh:mm a');
      $scope.create = function(entry) {
        entry._id = (entries.length + 1).toString();
        entry.occuredAt = util.moment(entry.occuredAt).toString();
        entries.push(entry);
        $location.path('/entries/' + entry._id);
      }
    }
  ])
  .controller('EntryEditCtrl', ['$scope', 'entries', '$routeParams', '$location', 'util', 
    function($scope, entries, $routeParams, $location, util) {
      $scope.entry = util._(util._.findWhere(entries, {_id: $routeParams.id})).clone();
      $scope.update = function() {
        entries[0] = $scope.entry;
        $location.path('/entries/' + $scope.entry._id);
      }
  }])
  .factory('entries', [ 'util', function(util) {
    return [{
      _id: "1",
      occuredAt: "Tue Feb 05 2013 11:24:00 GMT-0500 (EST)",
      description: 'Breakfast Sandwich',
      points: 5,
      tags: 'Breakfast'
    }]
  }])
  .factory('util', function() {
    var util = {};
    util._ = _;
    util.moment = moment;
    return util;
  })
  ;