/*jslint browser:true */
'use strict';

angular.module('hashtag.controller', [])
  .controller('HashtagCtrl', HashtagCtrl);

HashtagCtrl.$inject = ['$location', 'instagramAPI'];

function HashtagCtrl ($location, instagramAPI) {
  var vm = this;
  vm.title = '#yourhashtag';
  vm.data = {};
  vm.data.images = {};
  vm.data.meta = {};
  vm.authLink = instagramAPI.getAuthLink();
  vm.accessToken = '';
  vm.processForm = processForm;
  vm.removeImage = removeImage;
  vm.featureImage = featureImage;
  vm.hashtag = 'gbxoxo';
  instagramAPI.setAuth();

  if ($location.$$path !== '/') {
    vm.accessToken = $location.$$path.slice(1);
    instagramAPI.setAuth(vm.accessToken);
    $location.path('/');
  }
  //////////////
  ////////
  ////
  function processForm (hashtag) {
    instagramAPI.fetchHashtag(hashtag,  function(data) {
      vm.data.images = data.map(function (x) {
        return x.images.standard_resolution;
      });
    });
    vm.data.meta.title = '#' + hashtag;
    vm.title = '#' + hashtag;
  }
  function removeImage (index) {
    vm.data.images.splice(index, 1);
  }
  function featureImage (index, isFeatured) {
    vm.data.images[index].isFeatured = !isFeatured;
  }
}

