var app = angular.module('app', []);

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
  this.user = "Seimith";
  this.mockdata = [
    {username: 'Anderson Von Quigley', link: 'Chickamauga Battlefield Marathon', comments: [
                                                                                            {username: 'Ryan Williams', comment:'Can I do this?'}, 
                                                                                            {username: 'Bryan Lee', comment:'Yeah, man!'}, 
                                                                                            {username: 'Tejas Meta', comment:'The questions is how fast can you go?'}, 
                                                                                            ]},
    {username: 'Fred Bradley', link: 'Lake Chabot Trail Marathon', comments: {test:'can i do this'}},
    {username: 'Anderson Von Quigley', link: 'Mesquite Tri-State Marathon', comments: {test:'can i do this'}},
    {username: 'Anderson Von Quigley', link: 'NJ Trail Series One Day Marathon', comments: {test:'can i do this'}}
  ];  
  this.comments = function(index) {
    this.comment = this.mockdata[index].comments;
    debugger
  }
}]);
