describe('mainController', function() {
  beforeEach(function () {
    module('TeamsOfLegends');
  });

  var $controller;

  beforeEach(inject(function(_$controller_, _RequestService_){
    $controller = _$controller_;
    RequestService = _RequestService_;
  }));

  describe('$scope.renderReset', function() {
    it('should reset render values to false', function() {
      var $scope = {},
        controller = $controller('mainController', { $scope: $scope });

      $scope.render = {
        summonerResult: false,
        summonerNoResult: true
      };
      $scope.renderReset();
      expect($scope.render.summonerNoResult).toBe.false;
    });
  });

  describe('$scope.searchForSummoner', function() {
    it('should return nothing if no search term is passed in', function() {
      var $scope = {},
        controller = $controller('mainController', { $scope: $scope }),
        searchTerm;

      RequestService.getSummoner = sinon.spy();

      $scope.render = { summonerResult: false }
      $scope.searchForSummoner(searchTerm);

      expect($scope.render.summonerResult).toBe.false;
      expect(RequestService.getSummoner.calledWith(searchTerm)).toBe.false;
    });

    it('should call RequestService to get summoners', function() {
      var $scope = {},
        controller = $controller('mainController', { $scope: $scope }),
        searchTerm = 'asd';

      RequestService.getSummoner = sinon.spy();

      $scope.searchForSummoner(searchTerm);

      expect(RequestService.getSummoner.calledWith(searchTerm)).toBe.true;
    });
  });

  describe('$scope.searchForTeams', function() {
    it('should return nothing if no summoner id is passed in', function() {
      var $scope = {},
        controller = $controller('mainController', { $scope: $scope }),
        summonerId;

      RequestService.getTeams = sinon.spy();

      $scope.searchForTeams(summonerId);

      expect(RequestService.getTeams.called).toBe.false;
    });

    it('should call RequestService to get teams', function() {
      var $scope = {},
        controller = $controller('mainController', { $scope: $scope }),
        summonerId = 1;

      RequestService.getSummoner = sinon.spy();

      $scope.searchForTeams(summonerId);

      expect(RequestService.getSummoner.calledWith(summonerId)).toBe.true;
    });
  });

});
