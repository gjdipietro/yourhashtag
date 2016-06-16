/*jslint browser:true */
(function() {
  'use strict';
  var credentials = {
    apiUrl: 'https://api.instagram.com/v1/',
    clientId: '93d7311401a74e1b8c1a3b9fa196ea20',
    secret: '5b9d91d5ddab440e89afe55004c442f1',
    callback: 'http://localhost:1337/callback.html'
  };

  angular
    .module('hashtag', [
      'hashtag.controller',
      'hashtag.instagramService',
      'ngCookies'
    ])
    .constant('instagramApiConfig', credentials)
    .run(['instagramAPI', 'instagramApiConfig', SetCredentials])
    .config(['$locationProvider', setLocationProvider]);

  function SetCredentials (instagramAPI, instagramApiConfig) {
    instagramAPI.setCredentials(instagramApiConfig);
  }

  function setLocationProvider ($locationProvider) {
    if (window.history && window.history.pushState) {
      $locationProvider.html5Mode(true);
    } else {
      $locationProvider.html5Mode(false);
    }
  }
})();
