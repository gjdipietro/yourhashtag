
(function() {
  'use strict';

  angular
    .module('hashtag.instagramService', ['ngCookies'])
    .factory('instagramAPI', instagramAPI);

  function instagramAPI ($http, $cookies) {
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
    };
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
    }

    // get rid of the hack here use some kind of load more on scroll
    function fetchHashtag (hashtag, cb, next) {
      var cbstr = '&callback=JSON_CALLBACK';
      var count = '100';
      var endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + cbstr + count;
      console.log(endPoint);
      $http.jsonp(endPoint).success(function (resp) {
        cb(resp);
      });
    }

    function getAuthLink () {
        return 'https://api.instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + callback + '&response_type=token';
    }
  }
})();
