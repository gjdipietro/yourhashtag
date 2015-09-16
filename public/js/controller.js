'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'instagramAPI',
  function($scope, instagramAPI) {
    
    //set initial value
    $scope.hashtag = 'gbxoxo';
    instagramAPI.setAuth();
    
    //handle the form
    $scope.processForm = function() {
      getHashtagData($scope.hashtag);
    }

    //make API call
    function getHashtagData(hashtag) {
      instagramAPI.fetchHashtag($scope.hashtag, function(data) {
        $scope.data = data;
      });
    }
  }
]);
