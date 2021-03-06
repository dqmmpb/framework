export class MainController {
  constructor ($scope, $log, $http, $state, toastr, sidebarGroup, cfg, main, profile) {
    'ngInject';

    this.cfg = cfg;
    this.$http = $http;
    this.toastr = toastr;
    this.isCollapse = false;

    $scope.cfg = cfg;
    $scope.loading = true;

    profile.getProfile().then((data)=> {

      $scope.profile = data;

      this.getSidebarGroups($scope, $state, sidebarGroup);

      this.getData($scope, main);

    });

  }

  getSidebarGroups($scope, $state, sidebarGroup) {
    sidebarGroup.init(this.cfg.sidebarData, '');
    $scope.$on('uib:sidebar.item.select', function($event, item) {
      if(item.leaf) {
        $state.go(item.sref, {}, {
          reload: true
        });
      }
    });

    this.sidebarGroups = sidebarGroup.getGroupsWithoutPromise();
    this.sidebarSelected = this.sidebarGroups[0];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
  }

  getData($scope, main) {
    main.getData().then((data)=> {

      $scope.loading = false;

      if(data) {
        $scope.mainData = data;
      }
    });
  }

}
