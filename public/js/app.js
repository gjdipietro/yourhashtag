'use strict';

var app = angular.module('hashtagApp', [
  'hashtagCtrl',
  'instagramService'
]);

app.constant('instagramApiConfig', {
  apiUrl: 'https://api.instagram.com/v1/',
  clientId: '93d7311401a74e1b8c1a3b9fa196ea20',
  secret: '5499973fbd254dccb72c4e3707803f32'
});

app.run(['instagramAPI', 'instagramApiConfig', function (instagramAPI, instagramApiConfig) {
  instagramAPI.setCredentials(instagramApiConfig);
}]);

