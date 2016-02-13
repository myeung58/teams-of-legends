var app = angular.module('TeamsOfLegends', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // from index?
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/views/home.html',
      controller: 'mainController'
    });

    $urlRouterProvider.otherwise('home');
  }
]);
