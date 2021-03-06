
define(['app'], function(app){

  app.config(function($stateProvider, $urlRouterProvider) {


    var access = app.routingConfig.accessLevels;

    //路由配置
    $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    //Should not delete the placeHolder
    //stateProviderPlaceHolder

        .state('app.games', {
        url: '/games',
        views: {
          'menuContent': {
            templateUrl: 'templates/games.html',
            controller: 'GamesCtrl'
          }
        },
        data: {
          access: access.public
        }
      })


        .state('app.game', {
        url: '/games/:gameId' ,
        views: {
          'menuContent': {
            templateUrl: 'templates/game.html',
            controller: 'GameCtrl'
          }
        },
        data: {
          access: access.public
        }
      })



        .state('app.start', {
        url: '/start',
        views: {
          'menuContent': {
            templateUrl: 'templates/start.html', //第一頁
            controller: 'StartCtrl'
          }
        },
        data: {
          access: access.public
        }
      })


        .state('app.user-info', {
        url: '/user_info',
        views: {
          'menuContent': {
            templateUrl: 'templates/user-info.html',
            controller: 'UserInfoCtrl'
          }
        },
        data: {
          access: access.user
        }
      })

    .state('app.wait-open', {
      url: "/wait-open",
      views: {
        'menuContent': {
          templateUrl: "templates/wait-open.html",
          controller: "WaitOpenCtrl"
        }
      },
      data: {
        access: access.public
      }
    })

    .state('app.message', {
      url: "/message",
      views: {
        'menuContent': {
          templateUrl: "templates/message.html"
        }
      },
      data: {
        access: access.public
      }
    })

    // about >>>
    .state('app.a-terms', {
      url: "/a-terms",
      views: {
        'menuContent': {
          templateUrl: "templates/a-terms.html"
        }
      },
      data: {
        access: access.public
      }
    })

    .state('app.a-privacy', {
      url: "/a-privacy",
      views: {
        'menuContent': {
          templateUrl: "templates/a-privacy.html"
        }
      },
      data: {
        access: access.public
      }
    })
    // <<< about end

    .state('app.modal-how-to-notification', {
      url: "/modal-how-to-notification",
      views: {
        'menuContent': {
          templateUrl: "templates/modal-how-to-notification.html"
        }
      },
      data: {
        access: access.public
      }
    })  

    .state('app.article', {
      url: "/article/:articleId/:articleTitle",
      views: {
        'menuContent': {
          templateUrl: "templates/article.html",
          controller: "ArticleCtrl"
        }
      },
      data: {
        access: access.public
      }
    })

    .state('app.l-article-list', {
      url: "/l-article-list",
      views: {
        'menuContent': {
          templateUrl: "templates/l-article-list.html"
        }
      },
      data: {
        access: access.public
      }
    })    

    .state('app.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "templates/about.html"
        }
      },
      data: {
        access: access.public
      }
    })

    // >>>臨時路由 tmp-routes

    .state('app.modal-allow-notification', {
      url: "/modal-allow-notification",
      views: {
        'menuContent': {
          templateUrl: "templates/modal-allow-notification.html"
        }
      },
      data: {
        access: access.public
      }
    })

    // <<<tmp end


    // if none of the above states are matched, use this as the fallback
    if (localStorage.getItem('user') !== null){
      $urlRouterProvider.otherwise('/app/wait-open');
    }else{
      $urlRouterProvider.otherwise('/app/start');
    }
  });
});
