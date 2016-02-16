app.service('RequestService', function ($http) {
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

  this.getTeams = function(summonerId, callback) {
    var url = '/teams/by-summoner?id=' + summonerId;
    $http.get(url)
      .then(function(response) {
        console.log('success response from backend');
        console.log(response.data);
        if (response.data[summonerId]) {
          callback(response.data[summonerId]);
        } else {
          callback();
        }
      });
  };

});
