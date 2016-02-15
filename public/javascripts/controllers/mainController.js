// move service back to service file after fixing Unknown Provider issue
angular.module('TeamsOfLegends').controller('mainController', function ($scope, SearchService, MetricsService) {
  $scope.searchTerm = '';
  $scope.summonerResult = {};
  $scope.teamsResult = {};
  $scope.currentTeam = {};
  $scope.render = {
    loadingText: false,
    summonerResult: false,
    summonerNoResult: false,
    teamsResult: false,
    teamsNoResult: false,
    teamStats: false,
  };
  $scope.test = MetricsService.test;

  $scope.renderReset = function(exception) {
    console.log('render reset');
    for (var key in $scope.render) {
      if (key !== exception) {
        $scope.render[key] = false;
      }
    }
  };

  $scope.searchForSummoner = function(searchTerm) {
    if (!searchTerm) { return; }
    console.log(searchTerm);
    $scope.searchTerm = searchTerm.trim();
    SearchService.getSummoner($scope.searchTerm, function(summoner) {
      console.log('about to render: ', summoner);
      $scope.renderReset();
      $scope.summonerResult = summoner;

      if (summoner) {
        $scope.render.summonerResult = true;
      } else {
        console.log('summoner no result');
        $scope.render.summonerNoResult = true;
      }
    });
    // then set summoner name and id to scope
    // then display a button for confirmation
  };

  $scope.searchForTeams = function() {
    if (!$scope.summonerResult.id) { return; }

    SearchService.getTeams($scope.summonerResult.id, function(teams) {
      console.log('about to render: ', teams);
      $scope.renderReset();
      $scope.teamsResult = teams;

      if (teams) {
        $scope.render.teamsResult = true;
      } else {
        console.log('team no result');
        $scope.render.teamsNoResult = true;
      }
    });
  };

  $scope.toggleTeamStats = function(team) {
    // $scope.renderReset('teamsResult');
    if ($scope.currentTeam === team) {
      $scope.renderReset('teamsResult');
      $scope.currentTeam = {};
    } else {
      $scope.currentTeam = team;
      $scope.render.teamStats = true;
    }
  };

});
