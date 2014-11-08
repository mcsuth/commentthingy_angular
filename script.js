var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  $scope.name = 'Angular App';
  $scope.currentPage = '';

  $scope.menu = function() {
    $scope.currentPage = 'pages/menu.html';
  };

  $scope.location = function() {
    $scope.currentPage = 'pages/location.html';
  };

  $scope.about = function() {
    $scope.currentPage = 'pages/about.html';
  };

}]);
