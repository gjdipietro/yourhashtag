'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'igAPI',
  function($scope, igAPI) {
    $scope.data = 'Getting data';
    getIgData();
    function getIgData() {
      igAPI.getPhotoData()
        .success(function (data) {
          $scope.data = data;
        })
        .error(function (response) {
          console.log(response);
        });
    }
  }
]);
