app.controller('authController', function ($scope, $state, AuthService) {
  $scope.user = {};
  $scope.isLoggedIn = false;
  $scope.errorMessage = '';
  $scope.render = {
    signupForm: false,
    signinForm: false
  };

  if (AuthService.isLoggedIn()) {
    $scope.isLoggedIn = true;
  }

  $scope.signup = function(user){
    $scope.user = user;

    AuthService.signup($scope.user, function(message) {
      console.log(message);
      if (message === 'success') {
        $scope.isLoggedIn = true;
        $scope.toggleSignupForm();
        console.log('logged in: ', message);
      } else {
        $scope.errorMessage = message;
      }
    });
  };

  $scope.signin = function(user){
    $scope.user = user;

    AuthService.signin($scope.user, function(message) {
      console.log(message);
      if (message === 'success') {
        $scope.isLoggedIn = true;
        $scope.toggleSigninForm();

        console.log('logged in: ', message);
      } else {
        $scope.errorMessage = message;
      }
    });
  };

  $scope.signout = function() {
    AuthService.signout();
    $scope.user = {};
    $scope.isLoggedIn = false;
  };

  $scope.toggleSignupForm = function() {
    $scope.render.signupForm = !$scope.render.signupForm;
    $scope.render.signinForm = false;
    $scope.errorMessage = '';
    console.log('toggling sign up form to: ', $scope.render.signupForm);
  };

  $scope.toggleSigninForm = function() {
    $scope.render.signinForm = !$scope.render.signinForm;
    $scope.render.signupForm = false;
    $scope.errorMessage = '';
    console.log('toggling sign in form to: ', $scope.render.signinForm);
  };

});
