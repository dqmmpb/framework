export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('proxy', {
      url: '/proxy',
      templateUrl: 'app/proxy/proxy.html',
      controller: 'ProxyController',
      controllerAs: 'proxy'
    })
    .state('proxyview', {
      url: '/proxyview/*type?id&redirect_url',
      templateUrl: 'app/proxy/view/proxyview.html',
      controller: 'ProxyViewController',
      controllerAs: 'proxyview'
    });

  $urlRouterProvider.otherwise('/');
}
