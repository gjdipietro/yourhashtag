'use strict';

angular.module('instagramService', ['ngCookies'])
  .factory('instagramAPI', instagramAPI);

  function instagramAPI ($http, $cookies) {
    var endPoint;
    var auth;
    var apiUrl;
    var callback;
    var clientId;
    var callbackString = '&callback=JSON_CALLBACK';
    var auth = '';
    var accessToken;
    
    var instagram =  {
      setCredentials: setCredentials,
      setAuth: setAuth,
      getAuth: getAuth,
      fetchHashtag: fetchHashtag,
      getAuthLink: getAuthLink,
    }
    return instagram;

    function setCredentials (instagramApiConfig) {
      apiUrl = instagramApiConfig.apiUrl;
      clientId = instagramApiConfig.clientId;
      callback = instagramApiConfig.callback;
    }

    function setAuth (accessToken) {
      if (accessToken) {
        auth = 'access_token=' + accessToken;
        $cookies.put('accessToken', accessToken)
      } else {
        auth = 'client_id=' + clientId;
      }
    }

    function getAuth () {
      if ($cookies.get('accessToken')) {
        auth = 'access_token=' + $cookies.get('accessToken');
      }
      return auth;
    };

    function fetchHashtag (hashtag, callback, count) {
      endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + callbackString;
      $http.jsonp(endPoint).success(function (response) {
        callback(response.data);
      });
    };

    function getAuthLink () {
        return 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + callback + '&response_type=token';
    };
  }

