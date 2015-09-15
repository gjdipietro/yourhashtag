'use strict';
/*jslint browser:true */

angular.module('hashtagCtrl', [])
.controller('hashtagCtrl', ['$scope', 'instagram',
  function($scope, instagram) {
    
    //set initial value
    $scope.hashtag = 'gbxoxo';
    
    //handle the form
    $scope.processForm = function() {
      getHashtagData($scope.hashtag);
    }

    //make API call
    function getHashtagData(hashtag) {
      instagram.fetchHashtag($scope.hashtag, function(data) {
        $scope.data = data;
      });
    }
  }
]);
