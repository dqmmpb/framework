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
    });

  $urlRouterProvider.otherwise('/');
}
