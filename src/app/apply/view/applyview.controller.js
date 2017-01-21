export class ApplyViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, cfg, apply, city, Upload, profile, $uibModal) {
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
        corpId: null,
        wangbaId: null,
        corpsecret: null,
        apply_id: null,
        department_id: null,
        cashier_dept_id: null,
        qrcode_path: null,
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

        this.initForm($scope, $log, toastr, $uibModal);
        this.viewFile($scope);

        this.initValidation($scope);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
        this.getData($scope, $log, $timeout, $state, $stateParams, toastr, apply, city, Upload, $scope.id, $uibModal);
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
    this.sidebarSelected = this.sidebarGroups[2].items[1];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
    if($scope.type === 'create')
      this.breads.push({
        title: '部署'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看应用部署'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑应用部署'
      });
    else if($scope.type === 'deploy')
      this.breads.push({
        title: '部署'
      });
  }

  initValidation($scope) {

    $scope.loading = false;

    console.log($scope);

    $scope.validator = {
    };
    $scope.errorMessages = {};


  }

  getData($scope, $log, $timeout, $state, $stateParams, toastr, apply, city, Upload, id, $uibModal) {
    var self = this;
    $scope.loading = false;

    apply.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = apply.wrapper(data);

        self.initForm($scope, $log, toastr, $uibModal);
        self.viewFile($scope);

        self.initValidation($scope);

        self.goView($scope, $state, $stateParams);
      }
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

  preParams(type, params, wangbaId) {
    var self = this;

    if(type === 'create') {
      return {
        wangbaId: wangbaId,
        corpId: params.corpId,
        secret: params.corpsecret,
        agentId: params.apply_id,
        departmentId: params.department_id,
        cashierDeptId: params.cashier_dept_id,
        qrcodeImgPath: params.qrcode_path
      };
    } else if(type === 'edit') {
      return {
        id: params.ticket_id,
        wangbaId: wangbaId,
        corpId: params.corpId,
        secret: params.corpsecret,
        agentId: params.apply_id,
        departmentId: params.department_id,
        cashierDeptId: params.cashier_dept_id,
        qrcodeImgPath: params.qrcode_path
      };
    } else if(type === 'delete') {
      return {
        id: params.id
      };
    } else if(type === 'deploy') {
      return {
        id: params.id
      };

    } else if(type === 'createQrcode') {
      return {
        id: Number(params.id)
      };
    }

  }

  initForm($scope, $log, toastr, $uibModal) {
    var self = this;

    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);
      if(isValid) {
        $log.log(self.preParams('create', $scope.info, $scope.id));
        self.$http({
          url: self.cfg.api.apply.save.url,
          method: self.cfg.api.apply.save.type,
          data: self.preParams('create', $scope.info, $scope.id)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('部署成功！');
            $scope.goview('apply');
          } else if(response.data.result === 1) {
            toastr.error(response.data.msg);
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
        $log.log(self.preParams('edit', $scope.info, $scope.id));
        self.$http({
          url: self.cfg.api.apply.update.url,
          method: self.cfg.api.apply.update.type,
          data: self.preParams('edit', $scope.info, $scope.id)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            if($scope.redirect_url) {
              location.href = $scope.redirect_url;
            } else {
              $scope.goview('apply');
            }
            //console.log(response.data.data.tickets);
            //$scope.info.qrcode_path = response.data.data.tickets.qrcodeImgPath;
          } else if(response.data.result === 1) {
            toastr.error(response.data.msg);
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

    $scope.deleteSubmit = function(id) {
      $log.log('delete： ' + id);


      var modalInstance = $uibModal.open({
        animation: false,
        component: 'modalComponentConfirm',
        backdrop: 'static'
      });

      modalInstance.result.then(function (result) {
        $log.log(result);
        if(result === 'ok') {

          self.$http({
            url: self.cfg.api.apply.delete.url,
            method: self.cfg.api.apply.delete.type,
            data: self.preParams('delete', $scope.info, $scope.id)
          }).then((response) => {
            if (response.data.result === 0) {
              toastr.success('删除成功！');
              $scope.goview('apply');
            } else if (response.data.result === 1) {
              toastr.error(response.data.msg);
            }
          }).catch((error) => {
            $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
            toastr.error('网络异常，请重试');
          });

        }
      }, function () {
        $log.info('modal-component dismissed at: ' + new Date());
      });


    };

    $scope.createQrcode = function($event) {
      $log.log(self.preParams('createQrcode', {
        id: $scope.id
      }));
      self.$http({
        url: self.cfg.api.apply.newqrcode.url,
        method: self.cfg.api.apply.newqrcode.type,
        params: self.preParams('createQrcode', {
          id: $scope.id
        })
      }).then((response) => {
        if(response.data.result === 0) {
          $scope.info.qrcode_path = response.data.data.codeImg;
          toastr.success('生成二维码成功！');
          //$scope.goview('apply');
        } else if(response.data.result === 1) {
          toastr.error(response.data.msg);
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };
  }

}
