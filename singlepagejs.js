var app = angular.module('app', ['ngRoute'])
  .factory('feeddata', function() {
    var items = [];
    var itemsService = {};
    
    itemsService.add = function(item) {
        items.push(item);
    };
    itemsService.list = function() {
        return items;
    };
    
    return itemsService;
  })
  .config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : 'pages/home.html',
          controller  : 'mainController'
      })
      // route for the about page
      .when('/test', {
          templateUrl : 'pages/comments.html',
          controller  : 'mainController'
      })
    })
  .controller('mainController', ['$scope', '$http', 'feeddata', function($scope, $http, feeddata) {
    this.user = {name: "Smith Suth", img: 'img/fem.png'};
    this.feeddata = [
      {username: this.user.name, img: 'img/fem.png', link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'How do I register?'}]},
      {username: 'Fred Bradley', img: 'img/male.png',link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'Can I do this?'}, {username: 'Bryan Lee', img: 'img/male.png', comment:'Yeah, man!'}, {username: 'Jackie Ivanov', img: 'img/fem.png', comment:'Nope.'}]},
      {username: 'Jackie Ivanov', img: 'img/fem.png',link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
      {username: 'Anderson Von Quigley', img: 'img/male.png',link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan Williams', img: 'img/male.png', comment:'Can I do this?'}, {username: 'Bryan Lee', img: 'img/male.png', comment:'Yeah, man!'} ]},
    ];  
    this.closeallcomments = function() {
      $scope.closeallcomments = false;
      this.commcount = 0;
    };
    this.sumbitcomment = function(index, postcomment) {
      var eachcomment = this.feeddata[index].comments;
      eachcomment.push({username: this.user.name, img: this.user.img, comment:postcomment});
      postcomment = '';
      // debugger
      //console.log(eachcomment)
    }
  }]);
