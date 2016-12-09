/**
 * Created by dengqiming on 06/12/2016.
 */

export function ToolsDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/tools/tools.html',
    scope: {
      groups: '='
    },
    controller: ToolsController,
    controllerAs: 'tools',
    transclude: true
  };

  return directive;

}

class ToolsController {
  constructor (/*$scope*/) {
    'ngInject';

    // $scope.$on('breadcrumb-change', function(e, newBreads) {
    //   $scope.breads = newBreads;
    // });
  }

}
