var app = angular.module('TeamsOfLegends', ['ui.router', 'ngAnimate']);

angular.module('TeamsOfLegends').config([
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
