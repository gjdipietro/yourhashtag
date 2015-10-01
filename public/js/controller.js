'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', '$location', 'instagramAPI',
  function($scope, $location, instagramAPI) {
    
    $scope.data = {};
    $scope.data.images = {};
    $scope.data.meta = {};
    $scope.authLink = "";
    $scope.authLink = instagramAPI.getAuthLink();

    instagramAPI.setAuth();

    $scope.processForm = function() {
      instagramAPI.fetchHashtag($scope._hashtag,  function(data) {
        $scope.data.images = data.map(function (x) {
          return x.images.standard_resolution;
        });
      });
      $scope.data.meta.title = '#' + $scope._hashtag;
    };

    $scope.removeImage = function (index) {
      $scope.data.images.splice(index, 1);
    };

    $scope.featureImage = function (index, isFeatured) {
      $scope.data.images[index].isFeatured = !isFeatured;
    };

    if ($location.$$path !== '/') {
      $scope.accessToken = $location.$$path.slice(1);
      instagramAPI.setAuth($scope.accessToken);
      $location.path('/');
    }
  }
]);

