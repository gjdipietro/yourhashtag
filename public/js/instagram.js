'use strict';

angular.module('instagramService', [])
  .factory('instagramAPI', ['$http', function ($http) {
    var instagram = {};
    var endPoint;
    var auth;
    var apiUrl;
    var callback;
    var clientId;
    var callbackString = '&callback=JSON_CALLBACK';
    var auth = '';
    var _access_token;
    
    instagram.setCredentials = function (instagramApiConfig) {
      apiUrl = instagramApiConfig.apiUrl;
      clientId = instagramApiConfig.clientId;
      callback = instagramApiConfig.callback;
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

    instagram.fetchHashtag = function (hashtag, callback, count) {
      endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + callbackString;
      $http.jsonp(endPoint).success(function (response) {
        callback(response.data);
      });
    };

    instagram.getAuthLink = function () {
        return 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + callback + '&response_type=token';
    };

    return instagram;
  
  }]);

