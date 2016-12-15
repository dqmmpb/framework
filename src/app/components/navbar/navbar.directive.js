export function NavbarDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/navbar/navbar.html',
    controller: NavbarController,
    controllerAs: 'navbar',
    transclude: true
  };

  return directive;
}

class NavbarController {
  constructor ($scope) {
    'ngInject';

    $scope.isNavCollapsed = true;

  }
}
