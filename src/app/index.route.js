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
    })
    .state('apply', {
      url: '/apply',
      templateUrl: 'app/apply/apply.html',
      controller: 'ApplyController',
      controllerAs: 'apply'
    })
    .state('role', {
      url: '/role',
      templateUrl: 'app/role/role.html',
      controller: 'RoleController',
      controllerAs: 'role'
    })
    .state('roleview', {
      url: '/roleview/*type?id&redirect_url',
      templateUrl: 'app/role/view/roleview.html',
      controller: 'RoleViewController',
      controllerAs: 'roleview'
    })
    .state('user', {
      url: '/user',
      templateUrl: 'app/user/user.html',
      controller: 'UserController',
      controllerAs: 'user'
    })
    .state('userview', {
      url: '/userview/*type?id&redirect_url',
      templateUrl: 'app/user/view/userview.html',
      controller: 'UserViewController',
      controllerAs: 'userview'
    });

  $urlRouterProvider.otherwise('/');
}
