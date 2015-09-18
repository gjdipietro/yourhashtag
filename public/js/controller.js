'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'instagramAPI',
  function($scope, instagramAPI) {
    //set initial value
    $scope.hashtag = 'gbxoxo';
    instagramAPI.setAuth();

    $scope.processForm = function() {
      //make API call
      instagramAPI.fetchHashtag($scope.hashtag, function(data) {
        $scope.images = data.map(function(x) { return x.images; });
      });
    }
    $scope.removeImage = function (index) {
      $scope.images.splice(index, 1);
    }
  }
]);
