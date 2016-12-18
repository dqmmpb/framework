export class DeployController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams,webDevTec, toastr, sidebarGroup, city) {
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
        name: '济宁同飞科技',
        area: '新疆维吾尔自治区',
        legal: '佟彩霞',
        cellphone: '13185016989',
        status: '待审核'
      },
      {
        ch: false,
        id: 2,
        idx: 2,
        name: '甘肃省事佳杰出商贸有限公司',
        area: '甘肃省',
        legal: '王国栋',
        cellphone: '13185016989',
        status: '审核通过'
      },
      {
        ch: false,
        id: 3,
        idx: 3,
        name: '云南云竟管理咨询有限公司',
        area: '云南省',
        legal: '张志刚',
        cellphone: '13185016989',
        status: '待审核'
      }
    ];

    $scope.chAll = false;

    $scope.checkAll = function () {
      if($scope.chAll) {
        for(var i in $scope.rows) {
          $scope.rows[i].ch = true;
        }
      } else {
        for(var j in $scope.rows) {
          $scope.rows[j].ch = false;
        }
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


    $scope.godeployview = function(type, id) {
      if(type === 'delete') {
        if(id) {
          alert('删除成功');
        }
      } else {
        $state.go('deployview', {
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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[1].items[0]);
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
