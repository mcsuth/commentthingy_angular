var app = angular.module('myApp', ['ngRoute'])

app.factory('factory', function() {
  var currentUser = [{username: 'Smith Suth', img: 'img/fem.png'}];
  var postIndexforcomment;
  var mockdata = [
    {username: currentUser[0].username, img: currentUser[0].img, link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'How do I register?'}]},
    {username: 'Fred Bradley', img: 'img/male.png',link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'Can I do this?'}, {username: 'Bryan Lee', img: 'img/male.png', comment:'Yeah, man!'}, {username: 'Jackie Ivanov', img: 'img/fem.png', comment:'Nope.'}]},
    {username: 'Jackie Ivanov', img: 'img/fem.png',link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
    {username: 'Anderson Von Quigley', img: 'img/male.png',link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'Can I do this?'}, {username: 'Bryan Lee', img: 'img/male.png', comment:'Yeah, man!'} ]},
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
  return feeditems;
});
app.config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : 'pages/feed.html',
          controller  : 'mainController'
      })
      // route for the about page
      .when('/addpost', {
          templateUrl : 'pages/post.html',
          controller  : 'addPostController'
      })
      .when('/addcomment', {
          templateUrl : 'pages/comments.html',
          controller  : 'addCommentController'
      })
    })
function mainController($scope,factory) {
    this.list = factory.list; 
    this.currentUser = factory.currentUser;
    this.whatindex = factory.setIndex;
}
function addPostController($scope, factory) {
    this.add = factory.add;
}
function addCommentController($scope, factory) {
    this.postIndexforcomment = factory.postIndexforcomment;
    this.addComment = factory.addComment;
}
