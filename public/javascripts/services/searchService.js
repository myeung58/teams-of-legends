// Fix Unknown Provider issue first

angular.module('TeamsOfLegends').service('SearchService', function ($http) {
  _this = this;
  this.urls = {};

  // send get request to backend
  this.getSummoner = function(searchTerm) {
    // send request to backend
    var url = '/summoners/by-name?name=' + searchTerm;
    $http.get(url)
      .then(function(value) {
        // should return a team name
        console.log('success response from backend');
        console.log(value);
      }, function() {
        // failure
        console.log('failure response from backend');
      });
  };
});
