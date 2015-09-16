'use strict';

angular.module('instagramService', [])
  .factory('instagramAPI', ['$http', function ($http) {
    var instagram = {};
    var endPoint;
    var auth = '';
    var apiUrl;
    var clientId;
    var callbackString = '&callback=JSON_CALLBACK';

    instagram.setCredentials = function (instagramApiConfig) {
      apiUrl = instagramApiConfig.apiUrl;
      clientId = instagramApiConfig.clientId;
    };

    instagram.setAuth = function (accessToken) {
      if (accessToken) {
        accessToken = accessToken;
        auth = 'access_token=' + accessToken;
      } else {
        auth = 'client_id=' + clientId;
      }
    };

    instagram.getAuth = function () {
      return auth;
    };

    instagram.fetchHashtag = function (hashtag, callback) {
      endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + callbackString;
      console.log(endPoint);
      $http.jsonp(endPoint).success(function (response) {
        callback(response.data);
      });
    };

    return instagram;
  
  }]);

