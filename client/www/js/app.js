// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
define([
    'cordova',
    // 'purl',
    // 'thenjs',
    'restangular',
    'angular-messages',
    'angular-translate',
    ], function(){

  var starter = angular.module('starter', [
    'ionic', 
    'ngMessages', 
    'ngCookies', 
    'pascalprecht.translate',
    'restangular'
    ])

  starter.run(function($ionicPlatform, Auth, LiveUpdate, $rootScope,PushProcessingService, Restangular,$timeout) {
      PushProcessingService.checkinitialize();
      console.log('starter run');
      if(localStorage.getItem('apnToken') != null){
          PushProcessingService.initialize();
       }
     
    $ionicPlatform.ready(function() {

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      // 强制更新
      // if (ionic.Platform.platform() !== 'macintel'){
      //   LiveUpdate.update().then(function(){
      //     var versionData = JSON.parse(localStorage.getItem('version'));
      //     window.location = versionData.currentUrl;
      //   },function(){
      //     if (navigator.splashscreen){
      //       navigator.splashscreen.hide();
      //     }
      //   });
      // }

      
    
      $timeout(function() {
        //ios强制开启推送
        if(ionic.Platform.isIOS()){
          console.log("开启否？"+PushProcessingService.checkResult());
          if (localStorage.getItem('user') !== null && PushProcessingService.checkResult() == "No"){
            Auth.disallow();
          }
        }

        if (ionic.Platform.isWebView()){
          LiveUpdate.update();
        }

        if (navigator.splashscreen){
          navigator.splashscreen.hide();
        }
      },500);
    


      // 检查是否被调用
      //ios
      var openUrl = localStorage.getItem('openUrl');
      localStorage.removeItem('openUrl');
      if (openUrl !== null){
        var parsedUrl = purl(openUrl);
        Auth.ssoAuth(parsedUrl.param());
      }
      //android
      var intent = localStorage.getItem('intent');
      localStorage.removeItem('intent');
      if (intent !== null){
        Auth.ssoAuth(JSON.parse(intent));
      }

    });
  });

  //角色配置
  (function(exports){
    var userRoles = {
        public: 1, // 001
        user:   2 // 010
    };
    exports.userRoles = userRoles;
    exports.accessLevels = {
        public: userRoles.public | // 11
                userRoles.user,
        user:   userRoles.user     // 10
    };
    })(typeof exports === 'undefined'? starter.routingConfig={}: exports);

  starter.controller("MainCtrl", function($scope, Auth) {

    $scope.height = 0;
    $scope.width = 0;
    $scope.footer = "show-footer"

    $scope.height = window.innerHeight;
    $scope.width = window.innerWidth;
    
    console.log("Ratio: " + window.devicePixelRatio);
    console.log("Height: " + $scope.height);

    if ($scope.height < 550) {
      $scope.footer = "hide-footer"
    }
    // alert("footer:"+$scope.height);
    $scope.requestAuth = function(url) {
      var parsedUrl = purl(url);  
      console.log(JSON.stringify(parsedUrl.param()));
      Auth.ssoAuth(parsedUrl.param());
    }
    $scope.requestAuthAd = function(intent) {
      console.log(intent);
      Auth.ssoAuth(JSON.parse(intent));
    };
  });

  return starter;
});


function handleOpenURL(url) {
    var body = document.getElementsByTagName("body")[0];
    var mainController = angular.element(body).scope();
    mainController.requestAuth(url);
}
function getIntentExtras(intent) {
    var body = document.getElementsByTagName("body")[0];
    var mainController = angular.element(body).scope();
    mainController.requestAuthAd(intent);
}