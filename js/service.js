'use strict';

angular.module('instagramService', [])
.factory('igService', ['$http', function ($http) {
  var igAPI = {};
  var clientId = '93d7311401a74e1b8c1a3b9fa196ea20';
  var serviceURL = 'https://api.instagram.com/v1/tags/';

  igAPI.getPhotoData = function (hashtag) {
    return $http({
      method: 'GET',
      url: serviceURL + hashtag + '/media/recent?client_id=' + clientId,
      dataType: 'json'
    });
  };

  return igAPI;
}]);
