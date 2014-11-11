angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
  .factory('factory', function() {
    var currentUser = [{username: 'Smith', img: 'img/fem.png'}];
    var postIndexforcomment;
    var commentIndex;
    var mockdata = [
      {username: currentUser[0].username, img: currentUser[0].img, time:1415640310207, link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'How do I register?'}]},
      {username: 'Fred', img: 'img/male.png', time:1415640310207, link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'Can I do this?'}, {username: currentUser[0].username, img: currentUser[0].img, time:1415640310207, comment:'Yeah, man!'}, {username: 'Jackie', img: 'img/fem.png',time:1415640310207, comment:'Nope.'}]},
      {username: 'Jackie', img: 'img/fem.png', time:1415640310207, link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
      {username: 'Anderson', img: 'img/male.png', time:1415640310207, link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan', img: 'img/male.png',time:1415640310207, comment:'Can I do this?'}, {username: 'Bryan', img: 'img/male.png',time:1415640310207, comment:'Yeah, man!'} ]},
      {username: 'Reza', img: 'img/male.png', time:1415640310207, link: 'Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: []}
    ]; 
    var feeditems = {};
    var itemComment;
    
    feeditems.add = function(item) {
      var d = new Date();
      var n = d.getTime();
      var itemComment = {username: currentUser[0].username, img: currentUser[0].img, link: item, time: n, comments: []};
      mockdata.unshift(itemComment);
    };
    feeditems.removePost = function(index, path) {
      mockdata.splice(index,1)
      // debugger
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
    return feeditems;
  })

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

  .controller('mainController', ['$scope', 'factory', '$route', '$routeParams', '$location', '$modal', '$log', '$rootScope', function($scope, factory, $route, $routeParams, $location, $modal, $log, $rootScope) {
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
      $rootScope.animation = currRoute.animation;
    });
    this.list = factory.list; 
    this.currentUser = factory.currentUser;
    this.whatindex = factory.setIndex;
    this.pathroute = $route;
    this.pathlocation = $location;
    $scope.modalitem;
    $scope.open = function (size, $index, path) {
      var modalInstance = $modal.open({
        templateUrl: 'pages/modaltemplate.html',
        controller: 'modalInstanceCtrl',
        size: size,
        index: $index,
      });
      this.setCommentIndex = factory.setCommentIndex(this.$index);
      debugger
      console.log(this.pathlocation)
    };
  }])

  .controller('addPostController', ['$scope', 'factory', function($scope, factory) {
    this.add = factory.add;
  }])

  .controller('addCommentController', ['$scope', 'factory', '$rootScope', '$location', function($scope, factory, $rootScope, $location) {
    this.blur = "blurbackground";
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
      $rootScope.animation = currRoute.animation;
    });
    this.currentUser = factory.currentUser;
    this.postIndexforcomment = factory.postIndexforcomment;
    this.addComment = factory.addComment;
    this.removeComment = factory.removeComment;
    this.getCommentIndex = factory.getCommentIndex;
    this.pathlocation = $location;
    this.removePost = factory.removePost;
  }])

  .controller('modalInstanceCtrl', ['$scope', '$modalInstance', 'factory', function($scope, $modalInstance, factory) {
    this.getCommentIndex = factory.getCommentIndex;
    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])