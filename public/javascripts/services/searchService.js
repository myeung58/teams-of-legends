// Fix Unknown Provider issue first

angular.module('TeamsOfLegends').service('SearchService', function ($http) {
  _this = this;
  this.urls = {};

  // send get request to backend
  this.getSummoner = function(searchTerm, callback) {
    // send request to backend
    var url = '/summoners/by-name?name=' + searchTerm;
    $http.get(url)
      .then(function(response) {
        // should return a team name
        console.log('success response from backend');
        console.log(response.data);
        if (response.data[searchTerm]) {
          callback(response.data[searchTerm]);
        } else {
          callback();
        }
      });
  };
});
