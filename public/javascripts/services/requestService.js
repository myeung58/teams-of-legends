app.service('RequestService', function ($http) {
  this.urls = {
    getSummonerUrl: '/summoners/by-name?name=',
    getTeamsUrl: '/teams/by-summoner?id='
  };

  this.getSummoner = function(searchTerm, callback) {
    var url = this.urls.getSummonerUrl + searchTerm;

    $http.get(url)
      .then(function(response) {
        if (response.data[searchTerm]) {
          callback(response.data[searchTerm]);
        } else {
          callback();
        }
      });
  };

  this.getTeams = function(summonerId, callback) {
    var url = this.urls.getTeamsUrl + summonerId;

    $http.get(url)
      .then(function(response) {
        if (response.data[summonerId]) {
          callback(response.data[summonerId]);
        } else {
          callback();
        }
      });
  };

});
