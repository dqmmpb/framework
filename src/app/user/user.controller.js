export class UserController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, user) {
    'ngInject';


    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = false;
    this.apiHost = location.protocol + '//' + location.host;
    this.getSidebarGroups($scope, $state, sidebarGroup);

    this.getUsers($scope, $log, user);

    $scope.gouserview = function(type, id) {
      if(type === 'delete') {
        if(id) {
          alert('删除成功');
        }
      } else {
        $state.go('userview', {
          type: type,
          id: id,
          redirect_url: encodeURIComponent(location.href)
        });
      }
    };

    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;

  }

  getUsers($scope, $log, user) {

    user.getUsers().then((data)=> {
      $scope.rows = [];

      for(var i = 0; i < data.length; i++) {
        $scope.rows[i] = {
          ch: false,
          id: data[i].id,
          idx: data[i].idx,
          name: data[i].name,
          dd: data[i].dd,
          role: data[i].role,
          cellphone: data[i].cellphone
        }
      }

      $scope.chAll = false;

      $scope.checkAll = function () {
        for(var i in $scope.rows) {
          $scope.rows[i].ch = $scope.chAll;
        }
      };

      $scope.check = function(item) {
        if(!item)
          $scope.chAll = false;
        else {
          for(var i in this.rows) {
            if(!$scope.rows[i].ch) {
              $scope.chAll = false;
              return;
            }
          }
          $scope.chAll = true;
        }
      };

    });
  }

  getSidebarGroups($scope, $state, sidebarGroup) {
    var self = this;
    $scope.$on('sidebar-item-click', function(e, item) {
      self.triggerSidebarItemClick($scope, $state, sidebarGroup, item);
    });

    // sidebarGroup.getGroups().then((data) => {
    //   this.sidebarGroups = data;
    //   this.breads = sidebarGroup.getGroupItems(data[1].items[0]);
    // });
    this.sidebarGroups = sidebarGroup.getGroupsWithoutPromise();
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[3].items[1]);
  }

  isLeafItem(item) {
    return item && (item.items && item.items.length == 0 || !item.items);
  }

  triggerSidebarItemClick($scope, $state, sidebarGroup, item) {
    if(this.isLeafItem(item)) {
      $state.go(item.sref);
      //this.breads = sidebarGroup.getGroupItems(item);
      //$scope.$broadcast('breadcrumb-change', data);
    }
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
