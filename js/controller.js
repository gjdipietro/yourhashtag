'use strict';

angular.module('hashTagCtrl', [])
.controller('hashTagCtrl', ['$scope', 'instagramService',
  function($scope, instagramService) {
    function getUserInfo() {
      instagramService.getPhotoData()
        .success(function (data) {
          $scope.data = data;
        })
        .error(function (response) {
          console.log(response);
        });
    }
  }
]);
