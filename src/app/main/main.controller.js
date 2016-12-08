export class MainController {
  constructor ($scope, $timeout, webDevTec, toastr, sidebarGroup) {
    'ngInject';

    var self = this;

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = false;

    this.getSidebarGroups(sidebarGroup);
    this.activate($timeout, webDevTec);

    $scope.$on('sidebar-item-click', function(e, item) {
      self.activateSidebarItemClick($scope, sidebarGroup, item);
    });
  }

  activate($timeout, webDevTec) {
    this.getWebDevTec(webDevTec);
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  getSidebarGroups(sidebarGroup) {
    sidebarGroup.getGroups().then((data) => {
      this.sidebarGroups = data;
    });
  }

  activateSidebarItemClick($scope, sidebarGroup, item) {
    var data = sidebarGroup.getGroupsItems(item);
    $scope.$broadcast('breadcrumb-change', data);
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
