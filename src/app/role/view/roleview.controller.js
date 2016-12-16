export class RoleViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, webDevTec, toastr, sidebarGroup, city, Upload) {
    'ngInject';


    $scope.type = $stateParams.type;
    $scope.id = $stateParams.id;

    this.awesomeThings = [];
    this.classAnimation = '';
    this.creationDate = 1480995513875;
    this.toastr = toastr;
    this.isCollapse = false;
    this.apiHost = location.protocol + '//' + location.host;
    this.getSidebarGroups($scope, $state, sidebarGroup);
    this.activate($timeout, webDevTec);


    $scope.info = {
      role_name: null,
      role_desc: null,
      role_auth: null
    };

    if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
      $scope.info = {
        role_name: '超级管理员',
        role_desc: '网吧钉钉管理中心最高权限',
        role_auth: [

        ]
      };
    }

    this.getCities($scope, $log, city);
    this.upload($scope, $log, Upload);
    this.initForm($scope, $http, $log);

    $scope.goroleview = function(type, id) {
      $state.go('roleview', {
        type: type,
        id: id,
        redirect_url: encodeURIComponent(location.href)
      });
    };

    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;


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
    //   this.breads = sidebarGroup.getGroupItems(data[0]);
    // });
    this.sidebarGroups = sidebarGroup.getGroupsWithoutPromise();
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[3].items[0]);
    if($scope.type === 'create')
      this.breads.push({
        title: '新增角色'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看角色'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑角色'
      });
  }

  isLeafItem(item) {
    return item && (item.items && item.items.length == 0 || !item.items);
  }

  triggerSidebarItemClick($scope, $state, sidebarGroup, item) {
    if(this.isLeafItem(item)) {
      $state.go(item.sref);
      //location.href = item.href;
      //this.breads = sidebarGroup.getGroupItems(item);
      //$scope.$broadcast('breadcrumb-change', data);
    }
  }

  getCities($scope, $log, city) {
    city.getCities().then((data)=> {
      angular.element('.select-group-all').each(function() {
        angular.element(this).selectizeCity({
          data: data,
          items: $scope.info.company_area || [],
          onChange: function($self) {
            var selectedObject = $self.selectedObject();
            var selectedLabel = $self.selectedLabel();
            var selectedValue= $self.selectedValue();
            $log.log(selectedObject, selectedLabel, selectedValue);
            $scope.info.company_area = selectedValue;
            $scope.info.company_area_label = selectedLabel;
          }
        });
      });
    });
    city.getCities(city.provinceFilter).then((data)=> {
      angular.element('.select-group-province').each(function() {
        angular.element(this).selectizeCity({
          data: data,
          names: ['province'],
          items: $scope.info.business_area || [],
          onChange: function($self) {
            var selectedObject = $self.selectedObject();
            var selectedLabel = $self.selectedLabel();
            var selectedValue= $self.selectedValue();
            $log.log(selectedObject, selectedLabel, selectedValue);
            $scope.info.business_area = selectedValue;
            $scope.info.business_area_label = selectedLabel;
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
        file.noedit = false;
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
  initForm($scope, $http, $log) {
    var self = this;
    $scope.createSubmit = function() {
      $log.log('create');
      // 处理提交前的表单数据
      var params = {
        role_name: $scope.info.role_name
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
    };

    $scope.editSubmit = function(id) {
      $log.log('edit： ' + id);
      // 处理提交前的表单数据
      var params = {
        id: id,
        role_name: $scope.info.role_name
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
    };

    $scope.deleteSubmit = function(id) {
      $log.log('delete: ' + id);
      // 处理提交前的表单数据
      var params = {
        id: id,
        role_name: $scope.info.role_name
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
    };
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
