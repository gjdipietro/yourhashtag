/*jslint browser:true */
'use strict';

angular.module('hashtag.controller', [])
  .controller('HashtagCtrl', HashtagCtrl);

HashtagCtrl.$inject = ['$location', 'instagramAPI'];

function HashtagCtrl ($location, instagramAPI) {
  //initialize view model
  var vm = this;
  vm.title = '#yourhashtag';
  vm.data = {};
  vm.data.images = {};
  vm.data.meta = {};
  vm.hashtag = 'gbxoxo';
  vm.authLink = instagramAPI.getAuthLink();
  vm.hasAccessToken = instagramAPI.hasAccessToken();
  //button click handlers
  vm.processForm = processForm;
  vm.clearForm = clearForm;
  vm.removeImage = removeImage;
  vm.featureImage = featureImage;
  vm.saveCollage = saveCollage;
  //init
  instagramAPI.setAuth();

  if ($location.$$path !== '/') {
    var accessToken = $location.$$path.slice(1);
    instagramAPI.setAuth(accessToken);
    vm.hasAccessToken = instagramAPI.hasAccessToken();;
    $location.path('/');
  }
  //App Logic
  function processForm (hashtag) {
    instagramAPI.fetchHashtag(hashtag,  function(data) {
      vm.data.images = data.map(function (x) {
        return x.images.standard_resolution;
      });
    }, 50);
    vm.data.meta.title = '#' + hashtag;
    vm.title = '#' + hashtag;
  }

  function clearForm() {
    $location.path('/');
    vm.title = '#yourhashtag';
    vm.data.images = {};
    vm.data.meta = {};
    vm.hashtag = '';
  }

  function removeImage (index) {
    vm.data.images.splice(index, 1);
  }

  function featureImage (index, isFeatured) {
    vm.data.images[index].isFeatured = !isFeatured;
  }

  function saveCollage (data) {
    console.log(data);
  }
}

