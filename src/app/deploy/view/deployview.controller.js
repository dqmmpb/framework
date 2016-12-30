export class DeployViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, cfg, deploy, city, Upload, profile) {
    'ngInject';

    this.cfg = cfg;
    this.$http = $http;
    this.toastr = toastr;
    this.isCollapse = false;

    $scope.cfg = cfg;
    $scope.loading = true;

    profile.getProfile().then((data)=> {

      $scope.type = $stateParams.type;
      $scope.id = $stateParams.id;

      $scope.profile = data;

      this.getSidebarGroups($scope, $state, sidebarGroup);

      $scope.info = {
        name: null,
        areaCode: null,
        area: null,
        area_label: null,
        address: null,
        cellphone: null,
        legal: null,
        is_same: true,
        real_cellphone: null,
        real_name: null,
        // 法人代表身份证照片
        pcfile: [{
          file: null,
          caption: '正面'
        },
          {
            file: null,
            caption: '反面'
          }],
        // 实际经营者
        rpcfile: [{
          file: null,
          caption: '正面'
        },
          {
            file: null,
            caption: '反面'
          }],
        // 营业执照正本扫描件
        blfile: [{
          file: null
        }],
        // 代理商申请表扫描件
        affile: [{
          file: null
        }]
      };

      if($scope.type === 'create') {

        this.initForm($scope, $log, toastr);
        this.viewFile($scope);

        this.getCities($scope, $log, $timeout, city);
        this.upload($scope, $log, Upload);

        this.initValidation($scope, deploy);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
        this.getData($scope, $log, $timeout, $state, $stateParams, toastr, deploy, city, Upload, $scope.id);
      }

    });

  }

  goView($scope, $state, $stateParams) {
    $scope.goview = function(view, type, id) {
      $state.go(view, {
        type: type,
        id: id,
        redirect_url: encodeURIComponent(location.href)
      });
    };
    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;
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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[2].items[0]);
    if($scope.type === 'create')
      this.breads.push({
        title: '新增网吧管理'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看网吧管理'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑网吧管理'
      });
    else if($scope.type === 'apply')
      this.breads.push({
        title: '审核网吧管理'
      });
  }

  validator(files) {
    for(var i in files) {
      if(!files[i].file) {
        return files[i];
      }
    }
  }

  initValidation($scope, dataService) {
    var self = this;

    $scope.validator = {
    };
    $scope.errorMessages = {};

    $scope.errorMessages.company_area_string = [
      {
        text: '请选择省市区(*必填)'
      }
    ];
    $scope.errorMessages.business_area_string = [
      {
        text: '请选择省市区(*必填)'
      }
    ];

    var i = 0,  il = 0;
    for(i = 0, il = $scope.info.pcfile.length; i < il; i++) {
      $scope.$watch('info.pcfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.pcfile);
        $scope.validator.pcfile = !vfile ? true : null;
        $scope.errorMessages.pcfile = [
          {
            text: '请上传身份证照片(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.rpcfile.length; i < il; i++) {
      $scope.$watch('info.rpcfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.rpcfile);
        $scope.validator.rpcfile = !vfile ? true : null;
        $scope.errorMessages.rpcfile = [
          {
            text: '请上传身份证照片(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.blfile.length; i < il; i++) {
      $scope.$watch('info.blfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.blfile);
        $scope.validator.blfile = !vfile ? true : null;
        $scope.errorMessages.blfile = [
          {
            text: '请上传营业执照正本照片/扫描件(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.affile.length; i < il; i++) {
      $scope.$watch('info.affile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.affile);
        $scope.validator.affile = !vfile ? true : null;
        $scope.errorMessages.affile = [
          {
            text: '请上传网络经营许可证照片/扫描件(*必填)'
          }
        ]
      });
    }

    $scope.$watch('info.is_same', function() {
      if($scope.oData) {
        var oldInfo = dataService.wrapper($scope.oData);
        $scope.info.real_name = oldInfo.real_name;
        $scope.info.real_cellphone = oldInfo.real_cellphone;
        $scope.info.rpcfile = oldInfo.rpcfile;
      } else {
        $scope.info.real_name = null;
        $scope.info.real_cellphone = null;
        $scope.info.rpcfile = [{
          file: null,
          caption: '正面'
        },
          {
            file: null,
            caption: '反面'
          }];
      }
    })

  }

  getData($scope, $log, $timeout, $state, $stateParams, toastr, deploy, city, Upload, id) {
    var self = this;
    deploy.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = deploy.wrapper(data);

        self.initForm($scope, $log, toastr);
        self.viewFile($scope);

        self.getCities($scope, $log, $timeout, city);
        self.upload($scope, $log, Upload);

        self.initValidation($scope, deploy);

        self.goView($scope, $state, $stateParams);
      }
    });
  }

  getCities($scope, $log, $timeout, city) {
    city.getCities().then((data)=> {

      $scope.loading = false;

      $timeout(function() {
        // 判断默认值
        if($scope.info.areaCode) {
          $scope.validator.company_area_string = ($scope.info.areaCode && $scope.info.areaCode.length === 3) ? true : undefined;
        }

        angular.element('.select-group-all').each(function() {
          angular.element(this).selectizeCity({
            data: data,
            items: $scope.info.areaCode || [],
            onChange: function($self) {
              var selectedObject = $self.selectedObject();
              var selectedLabel = $self.selectedLabel();
              var selectedValue = $self.selectedValue();
              $scope.info.areaCode = selectedValue;
              $scope.info.area = selectedLabel;
              $log.log(selectedObject, selectedLabel, selectedValue);

              // 接受值的变化
              if(!$scope.$$phase) {
                $scope.$apply(function() {
                  $scope.validator.company_area_string = ($scope.info.areaCode && $scope.info.areaCode.length === 3 ? true : undefined);
                });
              }
            }
          });
        });
      }, 10);


    });
     city.getCities(city.provinceFilter).then((data)=> {

      $scope.loading = false;

      $timeout(function() {
        // 判断默认值
        if($scope.info.business_areaCode) {
          $scope.validator.business_area_string = ($scope.info.business_areaCode && $scope.info.business_areaCode.length === 1) ? true : undefined;
        }

        angular.element('.select-group-province').each(function() {
          angular.element(this).selectizeCity({
            data: data,
            names: ['province'],
            items: $scope.info.business_areaCode || [],
            onChange: function($self) {
              var selectedObject = $self.selectedObject();
              var selectedLabel = $self.selectedLabel();
              var selectedValue = $self.selectedValue();
              $scope.info.business_areaCode = selectedValue;
              $scope.info.business_area = selectedLabel;
              $log.log(selectedObject, selectedLabel, selectedValue);

              // 接受值的变化
              if(!$scope.$$phase) {
                $scope.$apply(function() {
                  $scope.validator.business_area_string = ($scope.info.business_areaCode && $scope.info.business_areaCode.length === 1) ? true : undefined;
                });
              }
            }
          });
        });
      }, 10);

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
        url: self.cfg.api.upload.url,
        data: {file: file}
      }).then(function (resp) {
        $log.log('Success ' + resp.config.data.file.name + ' uploaded. Response: ' + resp.data);
        file.serverData = {
          name: resp.data.data,
          url: self.cfg.uploadPath + '/' + resp.data.data
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
      if (file) {
        if (angular.isObject(file)) {
          var value = self.getKeyValue($scope, key);
          // 移除对象
          if (value) {
            for (var o in value) {
              if (angular.isArray(value[o].file)) {
                var idx = value[o].file.indexOf(file);
                if (idx !== -1) {
                  value[o].file.splice(idx, 1);
                }
              } else if (angular.isObject(value[o].file)) {
                if (value[o].file == file)
                  value[o].file = null;
              }
            }
          }
        }
      }
    };
  }

  viewFile($scope) {
    var self = this;

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
                        return file.serverData.url;
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
                        return file.serverData.url;
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

  restructureFile(files) {

    var newFiles = [];
    if(files) {
      for(var i in files) {
        if(files[i] && files[i].serverData && files[i].serverData.name) {
          newFiles.push(files[i].serverData.name);
        }
      }
      if(newFiles && newFiles.length > 0) {
        return newFiles.join(',');
      }
    }
    return null;
  }

  preParams(type, params) {
    var self = this;

    if(type === 'create') {
      return {
        name: params.name,
        areaCode: params.areaCode.join(','),
        area: params.area.join(','),
        // business_areaCode: params.business_areaCode.join(','),
        // business_area: params.business_area.join(','),
        address: params.address,
        corporName: params.legal,
        corporMobile: params.cellphone,
        isCorporReal: params.is_same ? 0 : 1,
        realControlName: params.real_name,
        realControlMobile: params.real_cellphone,
        corporIdPic: self.restructureFile(self.getFiles(params.pcfile)),
        realControlPic: self.restructureFile(self.getFiles(params.rpcfile)),
        licencePic: self.restructureFile(self.getFiles(params.blfile)),
        dingCertifyPic: self.restructureFile(self.getFiles(params.affile))
      };
    } else if(type === 'edit') {
      return {
        id: params.id,
        name: params.name,
        areaCode: params.areaCode.join(','),
        area: params.area.join(','),
        // business_areaCode: params.business_areaCode.join(','),
        // business_area: params.business_area.join(','),
        address: params.address,
        corporName: params.legal,
        corporMobile: params.cellphone,
        isCorporReal: params.is_same ? 0 : 1,
        realControlName: params.real_name,
        realControlMobile: params.real_cellphone,
        corporIdPic: self.restructureFile(self.getFiles(params.pcfile)),
        realControlPic: self.restructureFile(self.getFiles(params.rpcfile)),
        licencePic: self.restructureFile(self.getFiles(params.blfile)),
        dingCertifyPic: self.restructureFile(self.getFiles(params.affile))
      };
    } else if(type === 'delete') {
      return {
        id: params.id
      };
    } else if(type === 'apply') {
      return {
        id: params.id
      };
    }

  }

  initForm($scope, $log, toastr) {
    var self = this;

    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);
      if(isValid) {
        $log.log(self.preParams('create', $scope.info));
        self.$http({
          url: self.cfg.api.deploy.save.url,
          method: self.cfg.api.deploy.save.type,
          data: self.preParams('create', $scope.info)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('新建成功！');
            $scope.goview('deploy');
          } else if(response.data.result === 1) {
            toastr.error('处理失败，请重试');
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

    $scope.editSubmit = function(id, isValid) {
      $log.log('edit： ' + id + '. isValid: ' + isValid);

      if(isValid) {
        $log.log(self.preParams('edit', $scope.info));
        self.$http({
          url: self.cfg.api.deploy.update.url,
          method: self.cfg.api.deploy.update.type,
          data: self.preParams('edit', $scope.info)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            $scope.goview('deploy');
          } else if(response.data.result === 1) {
            toastr.error('处理失败，请重试');
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

    $scope.deleteSubmit = function(id) {
      $log.log('delete： ' + id);

      self.$http({
        url: self.cfg.api.deploy.delete.url,
        method: self.cfg.api.deploy.delete.type,
        params: self.preParams('delete', $scope.info)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.error('删除成功！');
          $scope.goview('deploy');
        } else if (response.data.result === 1) {
          toastr.error('处理失败，请重试');
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };

    $scope.applySubmit = function(id, isValid) {

      $log.log('apply： ' + id + '. isValid: ' + isValid);

      if(isValid) {
        self.$http({
          url: self.cfg.api.deploy.apply.url,
          method: self.cfg.api.deploy.apply.type,
          data: self.preParams('apply', {
            id: $scope.info.id
          })
        }).then((response) => {
          if (response.data.result === 0) {
            toastr.error('处理成功！');
            $scope.goview('deploy');
          } else if (response.data.result === 1) {
            toastr.error('处理失败，请重试');
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

    $scope.setApplyResult = function(applyResult) {
      $scope.applyResult = {
        result: applyResult
      };
    }
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}
