/**
 * Created by dengqiming on 06/12/2016.
 */

export function BreadcrumbDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/breadcrumb/breadcrumb.html',
    scope: {
      breads: '='
    },
    controller: BreadcrumbController,
    controllerAs: 'breadcrumb',
    transclude: true
  };

  return directive;

}

class BreadcrumbController {
  constructor ($scope) {
    'ngInject';

    $scope.breads = [
      {
        title: '我的工作台',
        icon: 'fa-dashboard'
      }
    ];

    $scope.$on('breadcrumb-change', function(e, newBreads) {
      $scope.breads = newBreads;
    });
  }

}
