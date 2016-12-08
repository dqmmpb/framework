/**
 * Created by dengqiming on 06/12/2016.
 */

export function SidebarDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/sidebar/sidebar.html',
    scope: {
      groups: '=',
      isCollapse: '='
    },
    link: linkFunc,
    controller: SidebarController,
    controllerAs: 'sidebar',
    transclude: true
  };

  function linkFunc(scope, element, attrs) {

    scope.toggled = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
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
    }
  }

  return directive;

}

class SidebarController {
  constructor ($scope) {
    'ngInject';

    this.addGroup = function(groupScope) {
      var that = this;
      $scope.groups.push(groupScope);

      groupScope.$on('$destroy', function() {
        that.removeGroup(groupScope);
      });
    };
  }

}
