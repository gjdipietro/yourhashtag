'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'igAPI',
  function($scope, igAPI) {
    function getIgData(hashtag) {
      igAPI.getPhotoData(hashtag)
        .success(function (data) {
          $scope.data = data;
        })
        .error(function (response) {
          console.log(response);
        });
    }
  }
]);
