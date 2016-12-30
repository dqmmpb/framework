angular.module('ui.framework.sidebar', [])
  .controller('UibSidebarController', function () {

  })
  .directive('uibSidebar', function (cfg) {
    return {
      controller: 'UibSidebarController',
      controllerAs: 'sidebar',
      restrict: 'A',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'app/components/sidebar/sidebar.html';
      },
      transclude: true,
      scope: {
        profile: '=',
        groups: '=',
        isCollapse: '='
      },
      link: linkFunc
    };

    function linkFunc(scope, element, attrs) {

      scope.collapse = function() {
        scope.isCollapse = !scope.isCollapse;
        scope.tooltipEnable = !scope.tooltipEnable;
      };

      scope.tooltipEnable = scope.isCollapse;
      scope.miniClass = attrs.miniClass || 'sidebar-mini';
      scope.fullClass = attrs.fullClass || 'sidebar-full';

      if(!scope.isCollapse)
        element.addClass(scope.fullClass);
      else
        element.addClass(scope.miniClass);

      scope.$watch('isCollapse', function(isCollapse) {
        element.toggleClass(scope.miniClass, !!isCollapse);
      });

      scope.groupConfig = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
      };

      scope.select = function(item) {
        scope.$emit('uib:sidebar.item.select', item);
      };

      scope.hasAuth = function(item) {
        return cfg.hasAuth(scope.profile, item.resource);
      };

      scope.$watch('profile', function(newValue) {
      });
    }
  });
