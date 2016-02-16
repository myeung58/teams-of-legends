app.service('AuthService', function($http, $window){
  var _this = this;
  this.urls = {
    signup: '/signup',
    signin: '/signin'
  };

  this.saveToken = function(token) {
    $window.localStorage['teams-of-legends-token'] = token;
  };

  this.getToken = function() {
    return $window.localStorage['teams-of-legends-token'];
  };

  this.signup = function(user, callback){
    var url = this.urls.signup;

    $http.post(url, user)
      .then(function(response) {

        _this.saveToken(response.data.token);
        callback('success');
      }, function(response) {
        callback(response.data.message);
      });
  };

  this.signin = function(user, callback){
    var url = this.urls.signin;

    $http.post(url, user)
      .then(function(response){
        _this.saveToken(response.data.token);
        callback('success');
      }, function(response) {
        callback(response.data.message);
      });
  };

  this.signout = function() {
    $window.localStorage.removeItem('teams-of-legends-token');
  };

  this.isLoggedIn = function() {
    var token = this.getToken(),
      data;
    if (token) {
      // atob decodes a string of data which has been encoded using base-64 encoding
      data = JSON.parse($window.atob(token.split('.')[1]));

      // if expired, treat it as logged out
      return data.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  this.currentUser = function() {
    var token, data;

    if (this.isLoggedIn()) {
      token = this.getToken();
      data = JSON.parse($window.atob(token.split('.')[1]));

      return data;
    }
  };
});
