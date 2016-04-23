'use strict';

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider){
      $ocLazyLoadProvider.config({
          debug: false,
          events: true
      });

      $urlRouterProvider.otherwise('/dashboard/home');

      $stateProvider
        .state('dashboard', {
            url : '/dashboard',
            templateUrl: '/views/dashboard/main.html',
            resolve: {
                  loadMyDirectives: function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name : 'sbAdminApp',
                        files : [
                          '/scripts/directives/header/header.js',
                          '/scripts/directives/header/header-notification/header-notification.js',
                          '/scripts/directives/sidebar/sidebar.js',
                          '/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                        ]
                    }),
                    $ocLazyLoad.load(
                  {
                     name:'toggle-switch',
                     files:["/node_modules/angular-toggle-switch/angular-toggle-switch.min.js",
                            "/node_modules/angular-toggle-switch/angular-toggle-switch.css"
                        ]
                  }),
                  $ocLazyLoad.load(
                  {
                    name:'ngAnimate',
                    files:['/node_modules/angular-animate/angular-animate.js']
                  })
                  $ocLazyLoad.load(
                  {
                    name:'ngCookies',
                    files:['/node_modules/angular-cookies/angular-cookies.js']
                  })
                  $ocLazyLoad.load(
                  {
                    name:'ngResource',
                    files:['/node_modules/angular-resource/angular-resource.js']
                  })
                  $ocLazyLoad.load(
                  {
                    name:'ngSanitize',
                    files:['/node_modules/angular-sanitize/angular-sanitize.js']
                  })
                  $ocLazyLoad.load(
                  {
                    name:'ngTouch',
                    files:['/node_modules/angular-touch/angular-touch.js']
                  })
               }
            }
        })
             .state('dashboard.home',{
               url : '/home',
               controller: 'MainCtrl',
               templateUrl: '/views/dashboard/home.html',
               resolve : {
              loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  name:'sbAdminApp',
                  files:[
                  '/scripts/controllers/main.js',
                  '/scripts/directives/timeline/timeline.js',
                  '/scripts/directives/notifications/notifications.js',
                  '/scripts/directives/chat/chat.js',
                  '/scripts/directives/dashboard/stats/stats.js',
                  '/node_modules/angular-chart.js/dist/angular-chart.min.js',
                  '/node_modules/angular-chart.js/dist/angular-chart.css'
                  ]
                })
              }
            }
         })
        .state('dashboard.form',{
            templateUrl:'/views/form.html',
            url:'/form'  ,
            controller:'FormCtrl',
              resolve: {
                loadMyFile:function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name:'sbAdminApp',
                      files:['/scripts/controllers/form.js']
                  })
                }
              }
        })
        .state('dashboard.blank',{
        templateUrl:'/views/pages/blank.html',
        url:'/blank'
      })
      .state('login',{
        templateUrl:'/views/pages/login.html',
        url:'/login'
     })
      .state('dashboard.chart',{
        templateUrl:'/views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                '/node_modules/angular-chart.js/dist/angular-chart.min.js',
                '/node_modules/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['/scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'/views/sensorForm.html',
        url:'/table',
        controller:'FormCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['/scripts/controllers/form.js']
            })
          }
        }
    })
      .state('dashboard.panels-wells',{
          templateUrl:'/views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'/views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'/views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'/views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'/views/ui-elements/grid.html',
       url:'/grid'
   })
      .state('dashboard.addSensor',{
       templateUrl:'/views/addSensor.html',
       url:'/addSensor',
       controller:'SensorCtrl',
       resolve: {
         loadMyFile:function($ocLazyLoad) {
           return $ocLazyLoad.load({
               name:'sbAdminApp',
               files:['/scripts/controllers/addSensorController.js']
           })
         }
       }
   })
      .state('dashboard.addSensorHub', {
      templateUrl:'/views/addSensorHub.html',
      url:'/addSensorHub'
   })
}])
