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
    })
    .state('profit', {
      url: '/profit',
      templateUrl: 'app/profit/profit.html',
      controller: 'ProfitController',
      controllerAs: 'profit'
    })
    .state('profitview', {
      url: '/profitview/*type?id&redirect_url',
      templateUrl: 'app/profit/view/profitview.html',
      controller: 'ProfitViewController',
      controllerAs: 'profitview'
    })
    .state('deploy', {
      url: '/deploy',
      templateUrl: 'app/deploy/deploy.html',
      controller: 'DeployController',
      controllerAs: 'deploy'
    })
    .state('deployview', {
      url: '/deployview/*type?id&redirect_url',
      templateUrl: 'app/deploy/view/deployview.html',
      controller: 'DeployViewController',
      controllerAs: 'deployview'
    });

  $urlRouterProvider.otherwise('/');
}
