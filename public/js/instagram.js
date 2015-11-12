'use strict';

(function() {
angular.module('instagramService', ['ngCookies'])
  .factory('instagramAPI', instagramAPI);

  function instagramAPI ($http, $cookies) {
    var auth;
    var apiUrl;
    var callback;
    var clientId;
    var auth = '';
    var accessToken;
    var instagram =  {
      setCredentials: setCredentials,
      setAuth: setAuth,
      getAuth: getAuth,
      fetchHashtag: fetchHashtag,
      getAuthLink: getAuthLink,
      hasAccessToken: hasAccessToken
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
        $cookies.put('accessToken', accessToken);
      } else {
        auth = 'client_id=' + clientId;
      }
    }

    function hasAccessToken () {
      if ($cookies.get('accessToken')) {
        return true;
      }
      return false;
    }

    function getAuth () {
      if ($cookies.get('accessToken')) {
        auth = 'access_token=' + $cookies.get('accessToken');
      }
      return auth;
    };

    function fetchHashtag (hashtag, callback, count) {
      var callbackString = '&callback=JSON_CALLBACK';
      var endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + callbackString + '&count=' + count;
      $http.jsonp(endPoint).success(function (response) {
        callback(response.data);
      });
    };

    function getAuthLink () {
        return 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + callback + '&response_type=token';
    };
  }

})();