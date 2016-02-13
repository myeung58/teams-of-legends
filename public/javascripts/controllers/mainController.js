app.controller('mainController', function($scope, SearchService) {
  $scope.searchTerm = '';
  $scope.showLoadingText = false;

  $scope.searchFor = function(searchTerm) {
    if (!searchTerm) { return; }
    console.log(searchTerm);
    $scope.searchTerm = searchTerm.trim();
    SearchService.query($scope.searchTerm);
  };
});
