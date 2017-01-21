angular.module('ui.framework.navbar',[])
  .controller('UibNavbarController', function () {
    var vm = this;
    vm.isCollapsed = true;
  })
  .directive('uibNavbar', function ($state, cfg) {
    return {
      controller: 'UibNavbarController',
      controllerAs: 'navbar',
      restrict: 'A',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'app/components/navbar/navbar.html';
      },
      transclude: true,
      scope: {
        profile: '='
      },
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {

      scope.select = function(type) {
        scope.$emit('uib:navbar.item.select', type);
      };

      scope.$on('uib:navbar.item.select', function($event, type) {
        if(type === 'profile') {
          $state.go('profileview', {
            type: 'view'/*,
            redirect_url: encodeURIComponent(location.href)*/
          });
        } else if(type === 'logout') {
          location.href = cfg.api.logout.url;
        }
      });
    }
  });
