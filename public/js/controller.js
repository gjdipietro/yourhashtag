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
  vm.nextURL = '';

  //button click handlers
  vm.processForm = processForm;
  vm.clearForm = clearForm;
  vm.removeImage = removeImage;
  vm.saveCollage = saveCollage;
  vm.downloadAllImages = downloadAllImages;
  vm.loadMore = loadMore;

  //init
  instagramAPI.setAuth();
  instagramAPI.setAuth();
  if ($location.$$path !== '/') {
    var accessToken = $location.$$path.slice(1);
    instagramAPI.setAuth(accessToken);
    vm.hasAccessToken = instagramAPI.hasAccessToken();;
    $location.path('/');
  }

  //App Logic
  function processForm (hashtag) {
    instagramAPI.fetchHashtag(hashtag,  function(resp) {
      vm.nextURL = resp.pagination.next_max_id;
      vm.data.images = resp.data.map(function (x) {
        return x.images.standard_resolution;
      });
    }, 20);
    vm.data.meta.title = '#' + hashtag;
    vm.title = '#' + hashtag;
  }

  function loadMore (nextUrl) {
    instagramAPI.fetchHashtag(vm.hashtag,  function(resp) {
      vm.nextURL = resp.pagination.next_max_id;
      vm.data.images = resp.data.map(function (x) {
        return x.images.standard_resolution;
      });
    }, 20, nextUrl);
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

  function downloadAllImages(images) {
    var zip = new JSZip();
    var urls = images.map(function(image) {
      return image.url;
    }, 0);
    var waiting = urls.length;
    
    for (var i = 0; i < urls.length; i++) {
      convertImgToDataURLviaCanvas(urls[i], i, finish);
    }
    function finish() {
      waiting--;
      if (waiting == 0) {
        saveZip();
      }
    }
    function saveZip() {
      var blob = zip.generate({type:'blob'});
      saveAs(blob, vm.hashtag + '.zip');
    }
    function convertImgToDataURLviaCanvas(url, count, callback) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext('2d');
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL();
        dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
        zip.file('image_' + count + '.jpg', dataURL, {base64: true});
        canvas = null;
        callback();
      };
      img.src = url;
    }
  }

  function saveCollage (data) {
    console.log(data);
  }
}

