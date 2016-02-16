describe('mainController', function() {
  beforeEach(module('TeamsOfLegends'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.renderReset', function() {
    it('', function() {
      var $scope = {};
      var controller = $controller('mainController', { $scope: $scope });
      // $scope.password = 'longerthaneightchars';
      $scope.render = {
        loadingText: false,
        summonerResult: false,
        summonerNoResult: true,
        teamsResult: false,
        teamsNoResult: false,
        teamStats: false,
      };
      $scope.renderReset();
      expect($scope.render.summonerNoResult).to.be.false;
    });
  });
});
