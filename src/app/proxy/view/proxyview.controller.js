export class ProxyViewController {
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


    $scope.info = {
      company_name: null,
      company_area: null,
      company_area_label: null,
      company_address: null,
      cellphone: null,
      legal_representative: null,
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
      manage_not_same: true,
      real_manange_cellphone: null,
      real_manage_name: null,
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
      ],
      business_area: null,
      business_area_label: null,
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
      applyResult: null
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

    if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
      $scope.info = {
        company_name: '123',
        company_area: ["120000", "120000", "120103"],
        company_area_label: ["天津市", "天津市", "河西区"],
        company_address: '黄河道9527号3号楼5单元888',
        cellphone: '13819493700',
        legal_representative: '佟彩霞',
        // 法人代表身份证照片
        pcfile: [
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '正面'
          },
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '反面'
          }
        ],
        manage_not_same: true,
        real_manange_cellphone: '19255458833',
        real_manage_name: '康洪领',
        // 实际控制人
        rpcfile: [
          {
            file: null,
            caption: '正面'
          },
          {
            file: null,
            caption: '反面'
          }
        ],
        business_area: ["120000"],
        business_area_label: ["天津市"],
        // 营业执照正本扫描件
        blfile: [
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            }
          }
        ],
        // 代理商申请表扫描件
        affile: [
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '页1'
          },
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '页2'
          },
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '页3'
          },
          {
            file: {
              name: 'assets/images/upload/ABC.jpg',
              size: 278546,
              type: "image/jpeg",
              serverData: {
                name: 'ABC.jpg'
              },
              noedit: true
            },
            caption: '页4'
          }
        ],
        applyResult: null
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
    }

    $scope.validator = {};
    $scope.errorMessages = {};

    $scope.errorMessages.company_area_string = [
      {
        type: "required",
        text: '请选择省市区(*必填)'
      }
    ];
    $scope.errorMessages.business_area_string = [
      {
        type: "required",
        text: '请选择省市区(*必填)'
      }
    ];

    this.getCities($scope, $log, city);
    this.upload($scope, $log, Upload);
    this.initForm($scope, $http, $log);
    this.initWatch($scope);

    $scope.goproxyview = function(type, id) {
      $state.go('proxyview', {
        type: type,
        id: id,
        redirect_url: encodeURIComponent(location.href)
      });
    };

    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;

  }

  validator(files) {
    for(var i in files) {
      if(!files[i].file) {
        return files[i];
      }
    }
  }
  initWatch($scope) {
    var self = this;
    var i = 0,  il = 0;
    for(i = 0, il = $scope.info.pcfile.length; i < il; i++) {
      $scope.$watch('info.pcfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.pcfile);
        $scope.validator.pcfile = !vfile ? true : undefined;
        $scope.errorMessages.pcfile = [
          {
            type: "required",
            text: '请上传身份证照片(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.rpcfile.length; i < il; i++) {
      $scope.$watch('info.rpcfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.rpcfile);
        $scope.validator.rpcfile = !vfile ? true : undefined;
        $scope.errorMessages.rpcfile = [
          {
            type: "required",
            text: '请上传身份证照片(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.blfile.length; i < il; i++) {
      $scope.$watch('info.blfile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.blfile);
        $scope.validator.blfile = !vfile ? true : undefined;
        $scope.errorMessages.blfile = [
          {
            type: "required",
            text: '请上传营业执照正本照片/扫描件(*必填)'
          }
        ]
      });
    }

    for(i = 0, il = $scope.info.affile.length; i < il; i++) {
      $scope.$watch('info.affile[' + i +'].file', function() {
        var vfile = self.validator($scope.info.affile);
        $scope.validator.affile = !vfile ? true : undefined;
        $scope.errorMessages.affile = [
          {
            type: "required",
            text: '请上传网吧钉钉代理协议照片/扫描件(*必填)'
          }
        ]
      });
    }

    // $scope.$watch('info.company_area', function(newValue, oldValue) {
    //   console.log(newValue);
    //   $scope.validator.company_area_string = newValue ? true : undefined;
    //   $scope.errorMessages.company_area_string = [
    //     {
    //       type: "required",
    //       text: '请选择省市区(*必填)'
    //     }
    //   ]
    // });

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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[1].items[0]);
    if($scope.type === 'create')
      this.breads.push({
        title: '新增代理商'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看代理商'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑代理商'
      });
    else if($scope.type === 'apply')
      this.breads.push({
        title: '审核代理商'
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
            var selectedValue = $self.selectedValue();
            $scope.info.company_area = selectedValue;
            $scope.info.company_area_label = selectedLabel;
            $scope.validator.company_area_string = $scope.info.company_area.length === 3 ? true : undefined;
            $log.log(selectedObject, selectedLabel, selectedValue);

            // 获取焦点再失去焦点 否则model变更有问题 比较诡异
            angular.element('input[name="validator_company_area"]').focus();
            angular.element('input[name="validator_company_area"]').blur();
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
            var selectedValue = $self.selectedValue();
            $scope.info.business_area = selectedValue;
            $scope.info.business_area_label = selectedLabel;
            $scope.validator.business_area_string = $scope.info.business_area.length === 1 ? true : undefined;
            $log.log(selectedObject, selectedLabel, selectedValue);

            // 获取焦点再失去焦点 否则model变更有问题 比较诡异
            angular.element('input[name="validator_business_area"]').focus();
            angular.element('input[name="validator_business_area"]').blur();
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
    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);

      if(isValid) {
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
    };

    $scope.editSubmit = function(id, isValid) {
      $log.log('edit： ' + id + '. isValid' + isValid);

      if(isValid) {
        // 处理提交前的表单数据
        var params = {
          id: id,
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
    };

    $scope.applySubmit = function(id) {

      if($scope.info.applyResult) {
        $log.log('apply: ' + id + ', ' + ($scope.info.applyResult.result ? '审核通过' : '审核不通过'));
        // 处理提交前的表单数据
        var params = {
          id: id,
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
    };

    $scope.deleteSubmit = function(id) {
      $log.log('delete: ' + id);
      // 处理提交前的表单数据
      var params = {
        id: id,
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
