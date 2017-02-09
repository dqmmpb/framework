export class User2ViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, cfg, role, user2, RSAKEY, profile, $uibModal, deploy) {
    'ngInject';

    var self = this;
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
        ding_id: null,
        password: null,
        confirm: null,
        role: null,
        cellphone: null,
        roles: [],
        selectRoles: [],
        bossWangbas: null,
        selectBossWangbas: [],
        channel_code: null
      };

      $scope.getRoleToArray = function(roles, key) {
        if(angular.isArray(roles)) {
          return roles.map(function(item) {
            return item[key];
          });
        } else {
          return [];
        }
      };

      $scope.hasRoleId = function(roles, id) {
        return self.hasRoleId(roles, id);
      };

      if($scope.type === 'create') {
        this.initForm($scope, $log, toastr, RSAKEY, $uibModal, cfg, $timeout, role, deploy);
        this.getRoles($scope, $log, $timeout, role, deploy);

        this.initValidation($scope);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'reset') {
        this.getData($scope, $log, $timeout, $state, $stateParams, toastr, user2, role, RSAKEY, $scope.id, $uibModal,deploy, cfg);
      }

    });

  }

  hasRoleId(roles, id) {
    //console.log(roles.indexOf(id) !== -1 ? true : roles.indexOf(Number(id)) !== -1  ? true : false);
    return roles.indexOf(id) !== -1 ? true : roles.indexOf(Number(id)) !== -1  ? true : false;
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
    this.sidebarSelected = this.sidebarGroups[3].items[2];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
    if($scope.type === 'create')
      this.breads.push({
        title: '新增网吧用户管理'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看网吧用户管理'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑网吧用户管理'
      });
    else if($scope.type === 'reset')
      this.breads.push({
        title: '重置密码'
      });
  }


  initValidation($scope) {

    $scope.validator = {
    };
    $scope.errorMessages = {};

  }

  getRoles($scope, $log, $timeout, role, deploy) {
    var self = this;
    role.getWangbaUserAll().then((data)=> {
      if(data) {
        $scope.validator.role_string = $scope.info.roles.join(',');

        $scope.roles = role.wrapperAll(data);

        $scope.loading = false;

        if(!$scope.info.roles)
          $scope.info.selectRoles = [];
        else
          $scope.info.selectRoles = $scope.getRoleToArray($scope.info.role, 'id');

        if($scope.hasRoleId($scope.info.roles, '4')) {
          self.getBarname($scope, $log, $timeout, deploy);
        }

        $timeout(function() {
          angular.element('.input-select-role').each(function() {
            angular.element(this).selectize({
              options: $scope.roles,
              items: $scope.info.roles || [],
              labelField: 'name',
              valueField: 'id',
              maxItems: 1,
              placeholder: '用户角色',
              onChange: function(value) {

                $scope.info.selectRoles = [value];

                // 接受值的变化
                if(!$scope.$$phase) {
                  $scope.$apply(function() {
                    $scope.validator.role_string = value;
                    self.getBarname($scope, $log, $timeout, deploy);
                  });
                }
              }
            });
          });
        }, 10);

      }
    });
  }

  getBarname($scope, $log, $timeout, deploy) {
    deploy.getName().then((data)=> {
      if(data) {
        //$scope.validator.role_barname = $scope.info.deploys.join(',');

        $scope.deploys = deploy.wrapperAll(data);

        if(!$scope.info.bossWangbas)
          $scope.info.selectBossWangbas = [];
        else
          $scope.info.selectBossWangbas = [$scope.info.bossWangbas.id];

        $scope.loading = false;

        if($scope.info.bossWangbas)
          $scope.validator.deploy_barname = $scope.info.bossWangbas.id;

        $timeout(function() {
          angular.element('.input-select-name').each(function() {
            angular.element(this).selectize({
              options: $scope.deploys,
              items: $scope.info.bossWangbas ? [$scope.info.bossWangbas.id] : [],
              labelField: 'name',
              valueField: 'id',
              maxItems: 1,
              placeholder: '网吧名称',
              onChange: function(value) {

                $scope.info.selectBossWangbas = [value];

                // 接受值的变化
                if(!$scope.$$phase) {
                  $scope.$apply(function() {
                    $scope.validator.deploy_barname = value;
                  });
                }
              }
            });
          });
        }, 10);
      }
    });
  }

  getData($scope, $log, $timeout, $state, $stateParams, toastr, user2, role, RSAKEY, id, $uibModal, deploy, cfg) {
    var self = this;
    user2.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = user2.wrapper(data);
        $scope.info.roles = $scope.getRoleToArray($scope.info.role, 'id');

        self.initForm($scope, $log, toastr, RSAKEY, $uibModal, cfg, $timeout, role, deploy);

        self.getRoles($scope, $log, $timeout, role, deploy);

        self.getBarname($scope, $log, $timeout, deploy);

        self.initValidation($scope, user2);

        self.goView($scope, $state, $stateParams);
      }
    });
  }

  preParams(type, params, encrypt) {
    var self = this;

    if(type === 'create') {
      return {
        //name: params.name,
        //dingId: params.ding_id,
        mobile: params.cellphone,
        //password: params.password,//encrypt.encrypt(params.password),
        //confirm: params.confirm,// encrypt.encrypt(params.confirm),
        oriRoleId: 4,
        rolesArray: params.selectRoles.join(',') ? params.selectRoles.join(',') : null,
        code: !self.hasRoleId(params.selectRoles, '9') ? null : params.code,
        wangbaId: !self.hasRoleId(params.selectRoles, '4') ? null : params.selectBossWangbas ? params.selectBossWangbas.join(',') : null
      };
    } else if(type === 'edit') {
      return {
        id: params.id,
        //password: params.password,//encrypt.encrypt(params.password),
        //confirm: params.confirm,// encrypt.encrypt(params.confirm),
        oriRoleId: 4,
        rolesArray: params.selectRoles.join(',') ? params.selectRoles.join(',') : null,
        wangbaId: !self.hasRoleId(params.selectRoles, '4') ? null : params.selectBossWangbas ? params.selectBossWangbas.join(',') : null
      };
    } else if(type === 'delete') {
      return {
        id: params.id
      }
    } else if(type === 'reset') {
      return {
        id: params.id,
        newPassword: encrypt.encrypt(params.newPassword),
        confirm: encrypt.encrypt(params.confirm),
        password: encrypt.encrypt(params.password)
      }
    } else if(type === 'mobilephoneExists') {
      return {
        mobile: params.mobile
      }
    }

  }

  initForm($scope, $log, toastr, RSAKEY, $uibModal, cfg, $timeout, role, deploy) {
    var self = this;

    // Encrypt with the public key...
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(RSAKEY.RSA_KEY);
    // Decrypt with the private key...
/*    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(RSAKEY.PRI_KEY);

    var plainText = 'Javascript中文';
    var encrypted = encrypt.encrypt(plainText);
    var decrypted = decrypt.decrypt(encrypted);
    $log.log('加密明文：' + plainText);
    $log.log('Js加密后：' + encrypted);
    $log.log('Js解密后：' + decrypted);*/

    $scope.keyUp = function($event) {
      var keyCode = $event.keyCode;
      if(keyCode === 13) {
        $event.preventDefault();
        $event.stopPropagation();

        mobileExists('#mobilephoneCheck');
      } else {
        var target = $event.currentTarget;
        var cellphone = angular.element(target).val();
        var isValid = /^1\d{10}$/.test(cellphone);
        if(!isValid) {
          $scope.flagMobile = false;
        }
      }
    };

    $scope.keyPress = function($event) {
      var keyCode = $event.keyCode;
      if(keyCode === 13) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    };

    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);
      if(isValid) {
        $log.log(self.preParams('create', $scope.info, encrypt));
        self.$http({
          url: self.cfg.api.wangbaUsers.update.url,
          method: self.cfg.api.wangbaUsers.update.type,
          data: self.preParams('create', $scope.info, encrypt)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('新建成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('user');
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
        $log.log(self.preParams('edit', $scope.info, encrypt));
        self.$http({
          url: self.cfg.api.wangbaUsers.update.url,
          method: self.cfg.api.wangbaUsers.update.type,
          data: self.preParams('edit', $scope.info, encrypt)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('user');
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
        backdrop: 'static',
        windowClass: 'modal-tips'
      });

      modalInstance.result.then(function (result) {
        $log.log(result);
        if(result === 'ok') {

          self.$http({
            url: self.cfg.api.wangbaUsers.delete.url,
            method: self.cfg.api.wangbaUsers.delete.type,
            params: self.preParams('delete', $scope.info, encrypt)
          }).then((response) => {
            if (response.data.result === 0) {
              toastr.success('删除成功！');
              $scope.goview('user');
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

    $scope.resetPasswordSubmit = function(id) {
      $log.log('resetPassoword： ' + id);

      self.$http({
        url: self.cfg.api.wangbaUsers.reset.url,
        method: self.cfg.api.wangbaUsers.reset.type,
        params: self.preParams('reset', $scope.info, encrypt)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.success('重置成功！');
          $scope.goview('user2');
        } else if (response.data.result === 1) {
          toastr.error(response.data.msg);
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };


    function mobileExists(target) {
      var cellphone = $scope.info.cellphone;
      var isValid = /^1\d{10}$/.test(cellphone);
      if(isValid) {
        $log.log(self.preParams('mobilephoneExists', $scope.info, encrypt));

        var element = angular.element(target);

        var counter = cfg.countDown({
          element: element,
          before: function(count) {
            self.$http({
              url: self.cfg.api.wangbaUsers.mobilephone.url,
              method: self.cfg.api.wangbaUsers.mobilephone.type,
              params: self.preParams('mobilephoneExists', {
                mobile: $scope.info.cellphone
              })
            }).then((response) => {
              if(response.data.result === 0) {
                if(response.data.data) {
                  toastr.success('手机号存在！');
                  clearInterval(counter);
                  element.attr('disabled', false);
                  element.text('手机号验证');
                  $scope.flagMobile = true;
                  self.getRoles($scope, $log, $timeout, role, deploy);
                  //element.removeClass('btn-warning').addClass('btn-danger').text('已验证存在');
                } else {
                  clearInterval(counter);
                  element.attr('disabled', false);
                  element.text('手机号验证');
                  toastr.error('手机号不存在！');
                  $scope.flagMobile = false;
                }
                //$scope.goview('user');
              } else if(response.data.result === 1) {
                clearInterval(counter);
                element.attr('disabled', false);
                element.text('手机号验证');
                toastr.error(response.data.msg);
              }

            }).catch((error) => {
              $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
              toastr.error('网络异常，请重试');
            });

            element.attr('disabled', true);
            element.addClass('btn-warning').removeClass('btn-danger');
            element.text('正在验证');
          },
          step: function() {
            element.attr('disabled', true);
            element.addClass('btn-warning').removeClass('btn-danger');
            element.text('正在验证');
          },
          end: function() {
            element.attr('disabled', false);
            element.addClass('btn-warning').removeClass('btn-danger');
            element.text('手机号验证');
          }
        });


      }
    }

    $scope.mobilephoneExists = function($event) {
      //var target = $event.currentTarget;

      mobileExists('#mobilephoneCheck');
    };

  }

}

