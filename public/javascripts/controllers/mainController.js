// move service back to service file after fixing Unknown Provider issue
angular.module('TeamsOfLegends').controller('mainController', function ($scope, SearchService) {
  $scope.searchTerm = '';
  $scope.summoner = {};
  $scope.render = {
    loadingText: false,
    summonerResult: false,
    summonerNoResult: false
  };

  $scope.renderReset = function() {
    console.log('render reset');
    $scope.render = {
      loadingText: false,
      summonerResult: false,
      summonerNoResult: false
    };
  };

  $scope.searchForSummoner = function(searchTerm) {
    var summoner;

    if (!searchTerm) { return; }
    console.log(searchTerm);
    $scope.searchTerm = searchTerm.trim();
    SearchService.getSummoner($scope.searchTerm, function(summoner) {
      console.log('about to render: ', summoner);
      $scope.renderReset();
      $scope.summoner = summoner;

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


});
