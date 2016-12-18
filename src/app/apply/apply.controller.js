export class ApplyController {
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
        bar_name: '杭州云顺网吧有限公司',
        bar_id: 2313,
        legal: '王晓蓉',
        cellphone: '186 6801 0202',
        status: '待部署'
      },
      {
        ch: false,
        id: 1,
        idx: 1,
        bar_name: '杭州沁泉网吧有限公司',
        bar_id: 3019,
        legal: '朱一峰',
        cellphone: '186 6801 0202',
        status: '已部署'
      },
      {
        ch: false,
        id: 1,
        idx: 1,
        bar_name: '杭州蓝盆友文化创意有限公司',
        bar_id: 3088,
        legal: '顾晨',
        cellphone: '137 3804 7339',
        status: '启用'
      },
      {
        ch: false,
        id: 1,
        idx: 1,
        bar_name: '云南昆明阿达音商贸有限公司第一分公司',
        bar_id: 3166,
        legal: '未知',
        cellphone: '137 3804 7339',
        status: '停用'
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

    $scope.goapplyview = function(type, id) {
      if(type === 'delete') {
        if(id) {
          alert('删除成功');
        }
      } else {
        $state.go('applyview', {
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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[2].items[1]);
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
