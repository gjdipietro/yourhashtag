'use strict';

var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
  clientID: '93d7311401a74e1b8c1a3b9fa196ea20',
  apiHost: 'https://api.instagram.com'
};

angular.module('instagramService', [])
  .factory('instagram', ['$http', function ($http) {
    return {
      fetchHashtag: function(hashtag, callback) {
        var endPoint = Instagram.Config.apiHost + '/v1/tags/' + hashtag + '/media/recent?client_id=' + Instagram.Config.clientID + '&callback=JSON_CALLBACK';
        $http.jsonp(endPoint).success(function(response) {
          callback(response.data);
        });
      }
    }
  }]);


