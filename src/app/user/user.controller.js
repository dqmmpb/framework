export class UserController {
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
        name: '王晓蓉',
        role: '超级管理员',
        cellphone: '13185016989'
      },
      {
        ch: false,
        id: 2,
        idx: 2,
        name: '王富友',
        role: '代理商主管理员',
        cellphone: '13185016989'
      },
      {
        ch: false,
        id: 3,
        idx: 3,
        name: '张志冰',
        role: '网吧业主',
        cellphone: '13185016989'
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
