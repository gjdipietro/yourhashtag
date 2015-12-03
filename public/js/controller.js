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
  vm.downloadAllImages = downloadAllImages;
  
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

  function downloadAllImages(images) {
    var urls = [
      'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12345895_1699198440317380_418577934_n.jpg',
      'https://scontent.cdninstagram.com/hphotos-xat1/t51.2885-15/s640x640/sh0.08/e35/12144228_1660648204205478_424448884_n.jpg',
      'https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s640x640/sh0.08/e35/11939465_867846576659579_409069286_n.jpg',
      'https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/e15/11910536_1664718590477001_2113943493_n.jpg'];
    var zip = new JSZip();
    var canvas = document.createElement("canvas");
    var context = canvas.getContext('2d');
    var i;
    var blob;

    for (i = 0; i < urls.length; i++) {
      convertImgToDataURLviaCanvas(urls[i], function(base64Img) {
        console.log(base64Img);
        zip.file('image-' +  i, base64Img, {base64: true});
      });
    }
    window.setTimeout(function(){
      blob = zip.generate({type:'blob'});
      saveAs(blob, vm.hashtag + '.zip');
    }, 10000);
    
    function convertImgToDataURLviaCanvas(url, callback) {
      var img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function() {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          var dataURL;
          canvas.height = this.height;
          canvas.width = this.width;
          ctx.drawImage(this, 100, 100);
          dataURL = canvas.toDataURL('image/jpeg', 1.0);
          callback(dataURL);
          canvas = null;
      };
      img.src = url;
    }
  }

  function saveCollage (data) {
    console.log(data);
  }
}

