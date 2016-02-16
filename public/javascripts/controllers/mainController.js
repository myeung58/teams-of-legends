app.controller('mainController', function ($scope, RequestService, StatsService) {
  $scope.searchTerm = '';
  $scope.summonerResult = {};
  $scope.teamsResult = {};
  $scope.currentTeam = {};
  $scope.currentRosterInfo = {};
  $scope.historySummary = {};
  $scope.render = {
    logo: true,
    loadingText: false,
    summonerResult: false,
    summonerNoResult: false,
    teamsResult: false,
    teamsNoResult: false,
    teamStats: false,
  };

  $scope.renderReset = function(exception) {
    for (var key in $scope.render) {
      if (key !== exception) {
        $scope.render[key] = false;
      }
    }
  };

  $scope.searchForSummoner = function(searchTerm) {
    if (!searchTerm) { return; }

    $scope.searchTerm = searchTerm.trim().toLowerCase();
    RequestService.getSummoner($scope.searchTerm, function(summoner) {
      $scope.renderReset();
      $scope.summonerResult = summoner;

      if (summoner) {
        $scope.render.summonerResult = true;
      } else {
        $scope.render.summonerNoResult = true;
      }
    });
  };

  $scope.searchForTeams = function() {
    if (!$scope.summonerResult.id) { return; }

    RequestService.getTeams($scope.summonerResult.id, function(teams) {
      $scope.renderReset();
      $scope.teamsResult = teams;

      if (teams) {
        $scope.render.teamsResult = true;
      } else {
        $scope.render.teamsNoResult = true;
      }
    });
  };

  $scope.toggleTeamStats = function(team) {
    if ($scope.currentTeam === team) {
      $scope.renderReset('teamsResult');
      $scope.currentTeam = {};
      $scope.currentRosterInfo = {};
    } else {
      $scope.currentTeam = team;
      $scope.render.teamStats = true;

      StatsService.compileHistorySummary(team.matchHistory, function(historySummary) {
        $scope.historySummary = historySummary;
      });

      StatsService.getRoster(team.roster, function(members) {
        $scope.currentRosterInfo = members;
      });
    }
  };

});
