(function(){
angular.module("myShareApp",['ngRoute','ui.bootstrap','ngResource']);

var configFunction=function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
                    templateUrl:'/home/home.view.html',
                    controller:'stockListCtrl',
                    controllerAs:'stockListVM'
    })
    .when('/stock/:stockId',{
                    templateUrl:'/stock/stock-details.view.html',
                    controller:'stockDetailsCtrl',
                    controllerAs:'vm'
    })
    .when('/about',{
                    templateUrl:'/about/about.view.html',
                    controller:'aboutCtrl',
                    controllerAs:'vm'
    })
    .when('/register',{
                    templateUrl:'/auth/register.view.html',
                    controller:'registerCtrl',
                    controllerAs:'vm'
    })
    .when('/login',{
                    templateUrl:'/auth/login.view.html',
                    controller:'loginCtrl',
                    controllerAs:'vm'
    })
    .when('/feedback',{
                    templateUrl:'/feedback/feedback.list.html',
                    controller:'feedbackListCtrl',
                    controllerAs:'feedbackListVM'
    })
                    .otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true);
};

angular.module("myShareApp")
    .config(['$routeProvider','$locationProvider',configFunction]);
})();