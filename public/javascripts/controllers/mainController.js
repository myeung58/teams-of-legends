app.controller('mainController', function ($scope, RequestService, StatsService, AuthService) {
  $scope.searchTerm = '';
  $scope.summonerResult = {};
  $scope.teamsResult = {};
  $scope.currentTeam = {};
  $scope.currentRosterInfo = {};
  $scope.historySummary = {};
  $scope.render = {
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
    console.log(searchTerm);
    $scope.searchTerm = searchTerm.trim().toLowerCase();
    RequestService.getSummoner($scope.searchTerm, function(summoner) {
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

    RequestService.getTeams($scope.summonerResult.id, function(teams) {
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
    if ($scope.currentTeam === team) {
      $scope.renderReset('teamsResult');
      $scope.currentTeam = {};
      $scope.currentRosterInfo = {};
    } else {
      $scope.currentTeam = team;
      $scope.render.teamStats = true;

      StatsService.compileHistorySummary(team.matchHistory, function(historySummary) {
        console.log('about to render history summary: ', historySummary);
        $scope.historySummary = historySummary;
      });

      StatsService.getRoster(team.roster, function(members) {
        console.log('about to render members: ', members);
        $scope.currentRosterInfo = members;
      });

    }
  };

  // if loggedin, send request to load saved teams
  // if (AuthService.isLoggedIn()) {
  //   $scope.showSavedTeams();
  //   console.log('is logged in');
  // }
});
