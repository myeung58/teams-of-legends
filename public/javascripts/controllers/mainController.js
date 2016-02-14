// move service back to service file after fixing Unknown Provider issue
angular.module('TeamsOfLegends').controller('mainController', function ($scope, SearchService) {
  $scope.searchTerm = '';
  $scope.showLoadingText = false;

  $scope.searchForSummoner = function(searchTerm) {
    if (!searchTerm) { return; }
    console.log(searchTerm);
    $scope.searchTerm = searchTerm.trim();
    SearchService.getSummoner($scope.searchTerm);
    // then set summoner name and id to scope
    // then display a button for confirmation
  };
});
