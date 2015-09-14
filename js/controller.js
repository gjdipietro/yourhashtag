'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'igService',
  function($scope, igService) {
    $scope.data = 'Getting data';
    getIgData();
    function getIgData() {
      igService.getPhotoData()
        .success(function (data) {
          $scope.data = data;
        })
        .error(function (response) {
          console.log(response);
        });
    }
  }
]);
