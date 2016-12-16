export class RoleController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams,webDevTec, toastr, sidebarGroup, city, Upload) {
    'ngInject';


    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = false;
    this.apiHost = location.protocol + '//' + location.host;
    this.getSidebarGroups($scope, $state, sidebarGroup);

    this.getCities($scope, $log, city);

    $scope.rows = [
      {
        ch: false,
        id: 1,
        idx: 1,
        name: '超级管理员',
        desc: '网吧钉钉管理中心最高权限'
      },
      {
        ch: false,
        id: 2,
        idx: 2,
        name: '代理商主管理员',
        desc: '代理商管理主管理员，可设置代理商以下层级使用人员的角色及权限',
      },
      {
        ch: false,
        id: 3,
        idx: 3,
        name: '代理商业务员',
        desc: '代理商管理主管理员，可设置代理商以下层级使用人员的角色及权限',
      },
      {
        ch: false,
        id: 4,
        idx: 4,
        name: '网吧业主',
        desc: '对应网吧管理主管理员，可设置对应网吧以下使用人员的权限',
      }
    ];

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

    $scope.goroleview = function(type, id) {
      if(type === 'delete') {
        if(id) {
          alert('删除成功');
        }
      } else {
        $state.go('roleview', {
          type: type,
          id: id,
          redirect_url: encodeURIComponent(location.href)
        });
      }
    };

    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;

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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[3].items[0]);
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

  getCities($scope, $log, city) {
    angular.element('.input-select').selectize();
    city.getCities(city.provinceFilter).then((data)=> {
      data.c.unshift({
        n: '全部',
        i: '100000'
      });
      angular.element('.select-group-province').each(function() {
        angular.element(this).selectizeCity({
          data: data,
          names: ['province'],
          items: [data.c[0].i] || [],
          onChange: function($self) {
            var selectedObject = $self.selectedObject();
            var selectedLabel = $self.selectedLabel();
            var selectedValue= $self.selectedValue();
            $log.log(selectedObject, selectedLabel, selectedValue);
          }
        });
      });
    });
  }

  getCityString(cities, separator) {
    if(cities) {
      if(separator)
        return cities.join(separator);
      else
        return cities.join(' ');
    }
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
