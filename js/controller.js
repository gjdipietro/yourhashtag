'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'igAPI',
  function($scope, igAPI) {
    function getIgData(hashtag) {

      console.log("laeast i'm here");

      igAPI.getPhotoData(hashtag)
        .success(function (data) {
          console.log("hashtag: " + hashtag);
          console.log(data);
          $scope.data = data;
        })
        .error(function (response) {
          console.log(response);
        });
    }
  }
]);
