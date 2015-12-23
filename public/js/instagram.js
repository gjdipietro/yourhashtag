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

    function fetchHashtag (hashtag, callback, next, allImages) {
      var callbackString = '&callback=JSON_CALLBACK';
      var endPoint = apiUrl + 'tags/' + hashtag + '/media/recent?' + instagram.getAuth() + callbackString + '&max_tag_id=' + next;
      var i;
      if (!allImages) {
        var allImages = [];
      }
      
      $http.jsonp(endPoint).success(function (response) {
        if (typeof response.pagination.next_max_id == 'undefined') {
          for (i = 0; i < response.data.length; i++){
            allImages.push(response.data[i]);
          }
          callback(allImages);
        } else {
          for (i = 0; i < response.data.length; i++){
            allImages.push(response.data[i]);
          }
          fetchHashtag(hashtag, callback, response.pagination.next_max_id, allImages)
        }
      });
    };

    function getAuthLink () {
        return 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + callback + '&response_type=token';
    };
  }
})()