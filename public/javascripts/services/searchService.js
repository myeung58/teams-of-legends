app.service('SearchService', function ($http) {
  _this = this;

  this.query = function(searchTerm) {
    // create url
    console.log('reached');

    var url = '';
    // send request to backend
    $http.get(url)
      .then(function() {
        // should return an array of team names
      }, function() {
        // failure
      });
  };
});
