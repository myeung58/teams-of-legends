var app = angular.module('TeamsOfLegends', ['ui.router']);

angular.module('TeamsOfLegends').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/views/home.html',
      controller: 'mainController'
    });

    $urlRouterProvider.otherwise('home');
  }
]);
