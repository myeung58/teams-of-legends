describe('authController', function() {
  beforeEach(module('TeamsOfLegends'));

  var $controller;

  beforeEach(inject(function(_$controller_, _AuthService_){
    $controller = _$controller_;
    AuthService = _AuthService_;
  }));

  describe('$scope.signup', function() {
    it('should call AuthService to signup', function() {
      var $scope = {},
        controller = $controller('authController', { $scope: $scope }),
        user = { username: 'asd' };

      AuthService.signup = sinon.spy();

      $scope.signup(user);

      expect(AuthService.signup.calledWith(user)).toBe.true;
    });
  });

  describe('$scope.signin', function() {
    it('should call AuthService to signup', function() {
      var $scope = {},
        controller = $controller('authController', { $scope: $scope }),
        user = { username: 'asd' };

      AuthService.signin = sinon.spy();

      $scope.signin(user);

      expect(AuthService.signin.calledWith(user)).toBe.true;
    });
  });

  describe('$scope.signout', function() {
    it('should call AuthService to signup', function() {
      var $scope = {},
        controller = $controller('authController', { $scope: $scope }),
        user = { username: 'asd' };
      $scope.isLoggedIn = true;

      AuthService.signout = sinon.spy();

      $scope.signout();

      expect(AuthService.signout.called).toBe.true;
      expect($scope.isLoggedIn).toBe.false;
    });
  });

  describe('$scope.toggleSignupForm', function() {
    it('toggle signup form', function() {
      var $scope = {},
        controller = $controller('authController', { $scope: $scope });

      $scope.render = {
        signupForm: false,
        signinForm: true
      };
      $scope.errorMessage = 'error';

      $scope.toggleSignupForm();
      expect($scope.render.signupForm).toBe.true;
      expect($scope.render.signinForm).toBe.false;
      expect($scope.errorMessage).toEqual('');
    });
  });

  describe('$scope.toggleSigninForm', function() {
    it('toggle signin form', function() {
      var $scope = {},
        controller = $controller('authController', { $scope: $scope });

      $scope.render = {
        signupForm: true,
        signinForm: false
      };
      $scope.errorMessage = 'error';

      $scope.toggleSigninForm();
      expect($scope.render.signupForm).toBe.false;
      expect($scope.render.signinForm).toBe.true;
      expect($scope.errorMessage).toEqual('');
    });
  });

});
