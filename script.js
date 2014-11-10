var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])

app.factory('factory', function() {
  var currentUser = [{username: 'Smith', img: 'img/fem.png'}];
  var postIndexforcomment;
  var commentIndex;
  var mockdata = [
    {username: currentUser[0].username, img: currentUser[0].img, link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', comments: [{username: 'Ryan', img: 'img/male.png', comment:'How do I register?'}]},
    {username: 'Fred', img: 'img/male.png',link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan', img: 'img/male.png', comment:'Can I do this?'}, {username: currentUser[0].username, img: currentUser[0].img, comment:'Yeah, man!'}, {username: 'Jackie', img: 'img/fem.png', comment:'Nope.'}]},
    {username: 'Jackie', img: 'img/fem.png',link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
    {username: 'Anderson', img: 'img/male.png',link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan', img: 'img/male.png', comment:'Can I do this?'}, {username: 'Bryan', img: 'img/male.png', comment:'Yeah, man!'} ]},
  ]; 
  var feeditems = {};
  var itemComment;
  
  feeditems.add = function(item) {
    mockdata.push(item);
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
    itemComment = {username: currentUser[0].username, img: currentUser[0].img, comment: item};
    mockdata[postIndexforcomment].comments.push(itemComment);
  };
  feeditems.setCommentIndex = function(index) {
    commentIndex = index;
  };
  feeditems.getCommentIndex = function(index) {
    return commentIndex;
  };
  feeditems.removeComment = function(index) {
    var mycomment = mockdata[postIndexforcomment].comments[index];
    mockdata[postIndexforcomment].comments.splice(index,1);
  };
  return feeditems;
});
app.config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : 'pages/feed.html',
          controller  : 'mainController',
          animation: 'first'
      })
      // route for the about page
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
function mainController($scope, factory, $route, $routeParams, $location, $modal, $log, $rootScope){
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    $rootScope.animation = currRoute.animation;
  });
  this.list = factory.list; 
  this.currentUser = factory.currentUser;
  this.whatindex = factory.setIndex;
  this.pathroute = $route;
  this.pathlocation = $location;

  $scope.modalitem;
  $scope.open = function (size, $index) {
    var modalInstance = $modal.open({
      templateUrl: 'pages/modaltemplate.html',
      controller: 'modalInstanceCtrl',
      size: size,
      index: $index,
    });
    this.modalitem = this.$index;
    this.setCommentIndex = factory.setCommentIndex(this.modalitem);
  };

}
function addPostController($scope, factory) {
  this.add = factory.add;
}
function addCommentController($scope, factory, $rootScope){
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
    $rootScope.animation = currRoute.animation;
  });
  this.currentUser = factory.currentUser;
  this.postIndexforcomment = factory.postIndexforcomment;
  this.addComment = factory.addComment;
  this.removeComment = factory.removeComment;
  this.getCommentIndex = factory.getCommentIndex;
}

function modalInstanceCtrl ($scope, $modalInstance, factory) {
  this.getCommentIndex = factory.getCommentIndex;
  $scope.ok = function () {
    $modalInstance.close();
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}
