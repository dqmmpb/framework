export class ProxyController {
  constructor ($scope, $log, $http, $timeout, $state, webDevTec, toastr, sidebarGroup, city, Upload) {
    'ngInject';

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = false;
    this.apiHost = location.protocol + '//' + location.host;
    this.getSidebarGroups($scope, $state, sidebarGroup);
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

    $scope.info = {
      company_name: '123',
      company_area: ["120000", "120000", "120103"],
      company_address: null,
      cellphone: null,
      legal_representative: null,
      business_area: null,
      manage_not_same: false,
      // 营业执照正本扫描件
      blfile: [
        {
          file: null
        }
      ],
      // 代理商申请表扫描件
      affile: [
        {
          file: null,
          caption: '页1'
        },
        {
          file: null,
          caption: '页2'
        },
        {
          file: null,
          caption: '页3'
        },
        {
          file: null,
          caption: '页4'
        }
      ],
      // 法人代表身份证照片
      pcfile: [
        {
          file: null,
          caption: '正面'
        },
        {
          file: null,
          caption: '反面'
        }
      ],
      // 实际经营者
      rpcfile: [
        {
          file: null,
          caption: '正面'
        },
        {
          file: null,
          caption: '反面'
        }
      ]
      // 多文件解决方案
      /*,blfile2: [
        {
          file: null
        }
      ],
      affile2: [
        {
          file: null
        }
      ]*/
    };

    this.getCities($scope, $log, city);
    this.upload($scope, $log, Upload);
    this.submit($scope, $http, $log);

    $scope.rows = [
      {
        ch: false,
        idx: 1,
        name: '济宁同飞科技',
        area: '新疆维吾尔自治区',
        legal: '佟彩霞',
        cellphone: '13185016989',
        status: '待审核'
      },
      {
        ch: false,
        idx: 2,
        name: '甘肃省事佳杰出商贸有限公司',
        area: '甘肃省',
        legal: '王国栋',
        cellphone: '13185016989',
        status: '待审核'
      },
      {
        ch: false,
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
        for(var i in $scope.rows) {
          $scope.rows[i].ch = false;
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
      location.href = $state.href(item.sref);
      //this.breads = sidebarGroup.getGroupItems(item);
      //$scope.$broadcast('breadcrumb-change', data);
    }
  }

  getCities($scope, $log, city) {
    angular.element('.input-select').selectize();
    city.getCities(city.provinceFilter).then((data)=> {
      console.log(data);
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
            $scope.info.business_area = selectedValue;
          }
        });
      });
    });
  }

  // 根据Key 查找$scope中的变量
  getKeyValue($scope, key) {
    var obj = $scope;

    if(key) {
      var keyPath = key.split('.');
      for(var tempKey in keyPath) {
        if(obj[keyPath[tempKey]])
          obj = obj[keyPath[tempKey]];
        else
          return null;
      }
      if(obj)
        return obj;
      else
        return null;
    } else
      return obj;
  }

  upload($scope, $log, Upload) {
    var self = this;
    // upload on file select or drop
    $scope.upload = function (file) {
      Upload.upload({
        url: self.apiHost + '/app/components/upload/url.json',
        data: {file: file}
      }).then(function (resp) {
        $log.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
        $log.log(self.apiHost + '/assets/images/upload/' + resp.config.data.file.name);
        file.serverData = {
          name: resp.config.data.file.name
        };

      }, function (resp) {
        $log.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $log.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };

    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          $scope.upload(files[i]);
        }
      }
    };

    // 统一使用数组方式存储对象
    $scope.removeFile = function (key, file) {
      if(file) {
        if(angular.isObject(file)) {
          var value = self.getKeyValue($scope, key);
          // 移除对象
          if(value) {
            for(var o in value) {
              if(angular.isArray(value[o].file)) {
                var idx = value[o].file.indexOf(file);
                if(idx !== -1) {
                  value[o].file.splice(idx, 1);
                }
              } else if(angular.isObject(value[o].file)) {
                if(value[o].file == file)
                  value[o].file = null;
              }
            }
          }
        }
      }
    };

    $scope.viewFile = function ($event, key, file) {
      var obj = $event.currentTarget;
      if(file) {
        if(angular.isObject(file)) {
          var value = self.getKeyValue($scope, key);
          // 查找元素
          if(value) {
            for(var o in value) {
              if(angular.isArray(value[o].file)) {
                var idx = value[o].file.indexOf(file);
                if(idx !== -1) {
                  // To do
                  if(!file.viewer) {
                    file.viewer = angular.element(obj).viewer({
                      navbar: false,
                      title: false,
                      transition: false,
                      fullscreen: false,
                      scalable: false,
                      slidable: false,
                      playable: false,
                      onetooneable: false,
                      url: function() {
                        return self.apiHost + '/assets/images/upload/' + file.serverData.name;
                      }
                    });
                    angular.element(obj).viewer('show');
                  }
                }
              } else if(angular.isObject(value[o].file)) {
                if(value[o].file == file) {
                  // To do
                  if(!file.viewer) {
                    file.viewer = angular.element(obj).viewer({
                      navbar: false,
                      title: false,
                      transition: false,
                      fullscreen: false,
                      scalable: false,
                      slidable: false,
                      playable: false,
                      onetooneable: false,
                      url: function() {
                        return self.apiHost + '/assets/images/upload/' + file.serverData.name;
                      }
                    });
                    angular.element(obj).viewer('show');
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  // 从存储的文件字段中读取所有文件，并拼接为数组
  getFiles(fileStructure) {
    var files = [];
    for(var obj in fileStructure) {
      if(angular.isArray(fileStructure[obj].file)) {
        files = files.concat(fileStructure[obj].file);
      } else if(angular.isObject(fileStructure[obj].file)) {
        files.push(fileStructure[obj].file);
      }
    }
    return files;
  }
  submit($scope, $http, $log) {
    var self = this;
    $scope.submit = function() {

      // 处理提交前的表单数据
      var params = {
        company_name: $scope.info.company_name,
        company_area: $scope.info.company_area,
        company_address: $scope.info.company_address,
        legal_representative: $scope.info.legal_representative,
        cellphone: $scope.info.cellphone,
        business_area: $scope.info.business_area,
        blfile: self.getFiles($scope.info.blfile),
        affile: self.getFiles($scope.info.affile),
        pcfile: self.getFiles($scope.info.pcfile)
/*        blfile2: self.getFiles($scope.info.blfile2),
        affile2: self.getFiles($scope.info.affile2),*/
      };

      $http({
        method: 'POST',
        url: self.apiHost + '/app/components/form/submit.json',
        data: params
      }).then((response) => {
        $log.log(response);
        return response.data;
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
    }
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
