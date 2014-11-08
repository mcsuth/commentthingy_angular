var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  this.user = "Smith Suth";
  this.feeddata = [
    {username: 'Anderson Von Quigley', link: 'Bacon ipsum dolor amet drumstick jerky venison tri-tip meatloaf swine leberkas bresaola frankfurter. Chicken ham hock ball tip leberkas corned beef. Frankfurter hamburger pig pastrami pork chop leberkas, filet mignon venison porchetta pancetta kielbasa tongue. ', 
    comments: [{username: 'Ryan Williams', comment:'How do I register?'}]},
    {username: 'Fred Bradley', link: 'Doner capicola chuck shoulder prosciutto tongue. Strip steak drumstick biltong chuck sirloin pancetta cow shank turducken tenderloin venison. Shankle t-bone bacon drumstick shoulder jowl frankfurter pancetta sausage tri-tip short loin.', comments: [{username: 'Ryan Williams', comment:'Can I do this?'}, {username: 'Bryan Lee', comment:'Yeah, man!'}, {username: 'Jackie Blue', comment:'Nope.'}]},
    {username: 'Anderson Von Quigley', link: 'Drumstick bacon beef sirloin, tri-tip porchetta pastrami.', comments: []},
    {username: 'Anderson Von Quigley', link: 'Prosciutto sirloin pancetta pork pig rump, brisket biltong pastrami short loin leberkas doner tenderloin. Ham hock drumstick rump short ribs, sirloin ball tip pork belly boudin landjaeger ground round meatball.', comments: [{username: 'Ryan Williams', comment:'Can I do this?'}, {username: 'Bryan Lee', comment:'Yeah, man!'} ]},
  ];  
  this.closeallcomments = function() {
    $scope.closeallcomments = false;
    this.commcount = 0;
  };
  this.sumbitcomment = function(index, postcomment) {
    var eachcomment = this.feeddata[index].comments;
    eachcomment.push({username: this.user, comment:postcomment});
    postcomment = '';
    debugger
    //console.log(eachcomment)
  }
}]);
