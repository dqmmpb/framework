export class MainController {
  constructor ($scope, $log, $timeout, webDevTec, toastr, sidebarGroup, city) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = true;

    this.getSidebarGroups($scope, sidebarGroup);
    this.activate($timeout, webDevTec);

    this.btnGroups = [
      {
        cssClass: '',
        btns: [
          {
            title: '返回',
            icon: 'fa-chevron-left',
            cssClass: 'btn-info'
          }
        ]
      },
      {
        cssClass: '',
        btns: [
          {
            title: '保存',
            icon: 'fa-save',
            cssClass: 'btn-success'
          },
          {
            title: '放弃',
            icon: 'fa-mail-forward',
            cssClass: 'btn-danger'
          }
        ]
      },
      {
        cssClass: 'pull-right',
        btns: [
          {
            title: '刷新',
            icon: 'fa-refresh',
            cssClass: 'btn-info'
          },
          {
            title: '配置',
            icon: 'fa-cog',
            cssClass: 'btn-primary'
          }
        ]
      }
    ];

    this.getCities($log, city);

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

  getSidebarGroups($scope, sidebarGroup) {
    var self = this;
    $scope.$on('sidebar-item-click', function(e, item) {
      self.triggerSidebarItemClick($scope, sidebarGroup, item);
    });

    sidebarGroup.getGroups().then((data) => {
      this.sidebarGroups = data;
      this.breads = sidebarGroup.getGroupItems(data[0]);
    });
  }

  isLeafItem(item) {
    return item && (item.items && item.items.length == 0 || !item.items);
  }

  triggerSidebarItemClick($scope, sidebarGroup, item) {
    if(this.isLeafItem(item)) {
      this.breads = sidebarGroup.getGroupItems(item);
      //$scope.$broadcast('breadcrumb-change', data);
    }
  }

  getCities($log, city) {
    city.getCities().then((data)=> {
      angular.element('.select-group-all').each(function() {
        angular.element(this).selectizeCity({
          data: data,
          onChange: function($self) {
            var selectedObject = $self.selectedObject();
            var selectedLabel = $self.selectedLabel();
            var selectedValue= $self.selectedValue();
            $log.log(selectedObject, selectedLabel, selectedValue);
          }
        });
      });
    });
    city.getCities(city.provinceFilter).then((data)=> {
      angular.element('.select-group-province').each(function() {
        angular.element(this).selectizeCity({
          data: data,
          names: ['province'],
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

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
