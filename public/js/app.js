(function() {
  'use strict';
  /*jslint browser:true */

  angular
    .module('hashtagApp', [
      'hashtagCtrl',
      'instagramService',
      'ngCookies'
    ])
    .constant('instagramApiConfig', {
      apiUrl: 'https://api.instagram.com/v1/',
      clientId: '93d7311401a74e1b8c1a3b9fa196ea20',
      secret: '5499973fbd254dccb72c4e3707803f32',
      callback: 'http://localhost:1337/callback.html'
    })
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