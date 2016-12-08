export function NavbarDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        creationDate: '='
    },
    controller: NavbarController,
    controllerAs: 'navbar',
    transclude: true
  };

  return directive;
}

class NavbarController {
  constructor ($scope, moment) {
    'ngInject';

    // "this.creationDate" is available by directive option "bindToController: true"
    $scope.relativeDate = moment($scope.creationDate).fromNow();
    $scope.isNavCollapsed = true;

  }
}
