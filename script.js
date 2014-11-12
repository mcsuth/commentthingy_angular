// Create Angular app module - injected dependencies here.
angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
  // Factory for data to be used in differernt controllers
  .factory('factory', function() {
    // Initialize empty factory object
    var feeditems = {};
    // This is the current user
    var currentUser = [{username: 'Smith', img: 'img/fem.png'}];
    // Instantiate variable for the index of the post which is used when looking at the comments of the particular post
    var postIndexforcomment;
    // Instantiate variable for the index of comments in a post
    var commentIndex;
    // Mock data - 5 posts with random comments that are shown in the feed
    var mockdata = [
      {username: currentUser[0].username, img: currentUser[0].img, time:1415640310207, link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'How do I register?'}]},
      {username: 'Fred', img: 'img/male.png', time:1415640310207, link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'Can I do this?'}, {username: currentUser[0].username, img: currentUser[0].img, time:1415640310207, comment:'Yeah, man!'}, {username: 'Jackie', img: 'img/fem.png',time:1415640310207, comment:'Nope.'}]},
      {username: 'Jackie', img: 'img/fem.png', time:1415640310207, link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
      {username: 'Anderson', img: 'img/male.png', time:1415640310207, link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'Can I do this?'}, {username: 'Bryan', img: 'img/male.png',time:1415640310207, comment:'Yeah, man!'} ]},
      {username: 'Reza', img: 'img/male.png', time:1415640310207, link: 'Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: []}
    ]; 
    // Initialize variable for adding comments to a post
    var itemComment;
    // Initialize variable to get the path that can be used in other controllers
    var thepath;
    // Getting and setting functions for adding, removing, etc
    feeditems.add = function(item) {
      var d = new Date();
      var n = d.getTime();
      var itemComment = {username: currentUser[0].username, img: currentUser[0].img, link: item, time: n, comments: []};
      mockdata.unshift(itemComment);
    };
    feeditems.removePost = function(index, path) {
      mockdata.splice(index,1)
    };
    feeditems.currentUser = function() {
      return currentUser;
    };
    feeditems.list = function() {
      return mockdata;
    };
    feeditems.setIndex = function(index) {
      postIndexforcomment = index;
    };
    feeditems.postIndexforcomment = function() {
      return postIndexforcomment;
    };
    feeditems.addComment = function(item) {
      var d = new Date();
      var n = d.getTime();
      var itemComment = {username: currentUser[0].username, img: currentUser[0].img, comment: item, time: n};
      mockdata[postIndexforcomment].comments.push(itemComment);
    };
    feeditems.setCommentIndex = function(index) {
      commentIndex = index;
    };
    feeditems.getCommentIndex = function(index) {
      return commentIndex;
    };
    feeditems.removeComment = function(index) {
      mockdata[postIndexforcomment].comments.splice(index,1);
    };
    feeditems.setPath = function(path) {
      thepath = path;
    };
    feeditems.getPath = function(path) {
      return thepath;
    };
    return feeditems;
  })
  // Configure routing for different paths using different controllers
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl : 'pages/feed.html',
          controller  : 'mainController',
          animation: 'first'
      })
      .when('/addpost', {
          templateUrl : 'pages/post.html',
          controller  : 'addPostController',
          animation: 'second'
      })
      .when('/addcomment', {
          templateUrl : 'pages/comments.html',
          controller  : 'addCommentController',
          animation: 'second'
      })
    })
  // This controller is for the feed view
  .controller('mainController', ['$scope', 'factory', '$route', '$routeParams', '$location', '$modal', '$log', '$rootScope', function($scope, factory, $route, $routeParams, $location, $modal, $log, $rootScope) {
    // Rootscope function for animation
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
      $rootScope.animation = currRoute.animation;
    });
    this.list = factory.list;  // Get the 'list' of data from mockdata array in the factory
    this.currentUser = factory.currentUser; // Get the info on the current user in the factory
    this.whatindex = factory.setIndex; // Set the index so that we can use it when deleting a post or w/e in the feed view
    this.pathroute = $route; // Get the route path
    this.pathlocation = $location; // Get the path location
    // UI-Bootstrap Modal variables and functions here
    $scope.modalitem;
    $scope.open = function (size, $index, path) { // Pass in the size for the modal size, index of what we click on, and path of the page
      var modalInstance = $modal.open({
        templateUrl: 'pages/modaltemplate.html',
        controller: 'modalInstanceCtrl',
        size: size,
        index: $index,
      });
      this.setCommentIndex = factory.setCommentIndex(this.$index); // Set the comment index
      this.setPath = factory.setPath(path); // Set the path
    };
  }])
  // This controller is for adding a post to the feed
  .controller('addPostController', ['$scope', 'factory', function($scope, factory) {
    this.add = factory.add; // Factory function to add a post
  }])
  // This controller is for adding a comment to a post
  .controller('addCommentController', ['$scope', 'factory', '$rootScope', '$location', function($scope, factory, $rootScope, $location) {
    // Rootscope function for animation
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
      $rootScope.animation = currRoute.animation;
    });
    this.currentUser = factory.currentUser; // Get current user from Factory
    this.postIndexforcomment = factory.postIndexforcomment; // Set index for comments
    this.addComment = factory.addComment; // Add a comment to a post
    this.removeComment = factory.removeComment; // Function to remove comment from a post
    this.getCommentIndex = factory.getCommentIndex; // Get the index for the coment to pass when we want to delete
    this.pathlocation = $location; // Get location path
    this.removePost = factory.removePost; // Function to remove post from feed
    this.getPath = factory.getPath; // Get path
  }])
  // This controller is for the modal that is used in both the feed and comment views
  .controller('modalInstanceCtrl', ['$scope', '$modalInstance', 'factory', function($scope, $modalInstance, factory) {
    this.getCommentIndex = factory.getCommentIndex; // Get index for comments
    this.getPath = factory.getPath; // Get path
    // Function to close modal
    $scope.ok = function () {
      $modalInstance.close();
    };
    // Function to close modal
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])