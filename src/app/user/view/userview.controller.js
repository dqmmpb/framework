export class UserViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, cfg, role, user, RSAKEY, profile) {
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
        ding_id: null,
        password: null,
        confirm: null,
        role: null,
        cellphone: null,
        roles: []
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

      if($scope.type === 'create') {
        this.initForm($scope, $log, toastr, RSAKEY);
        this.getRoles($scope, $log, $timeout, role);

        this.initValidation($scope);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'reset') {
        this.getData($scope, $log, $timeout, $state, $stateParams, toastr, user, role, RSAKEY, $scope.id);
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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[3].items[1]);
    if($scope.type === 'create')
      this.breads.push({
        title: '新增用户'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看用户'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑用户'
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

  getRoles($scope, $log, $timeout, role) {
    role.getAll().then((data)=> {
      if(data) {
        $scope.validator.role_string = $scope.info.roles.join(',');

        $scope.roles = role.wrapperAll(data);

        $scope.loading = false;

        $timeout(function() {
          angular.element('.input-select').each(function() {
            angular.element(this).selectize({
              options: $scope.roles,
              items: $scope.info.roles || [],
              labelField: 'name',
              valueField: 'id',
              maxItems: 1,
              placeholder: '用户角色',
              onChange: function(value) {
                $scope.info.roles = [value];

                // 接受值的变化
                if(!$scope.$$phase) {
                  $scope.$apply(function() {
                    $scope.validator.role_string = value;
                  });
                }
              }
            });
          });
        }, 10);
      }
    });
  }

  getData($scope, $log, $timeout, $state, $stateParams, toastr, user, role, RSAKEY, id) {
    var self = this;
    user.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = user.wrapper(data);
        $scope.info.roles = $scope.getRoleToArray($scope.info.role, 'id');

        self.initForm($scope, $log, toastr, RSAKEY);

        self.getRoles($scope, $log, $timeout, role);

        self.initValidation($scope, user);

        self.goView($scope, $state, $stateParams);
      }
    });
  }

  preParams(type, params, encrypt) {

    if(type === 'create') {
      return {
        name: params.name,
        dingId: params.ding_id,
        mobile: params.cellphone,
        password: params.password,//encrypt.encrypt(params.password),
        confirm: params.confirm,// encrypt.encrypt(params.confirm),
        rolesArray: params.roles.join(',')
      };
    } else if(type === 'edit') {
      return {
        id: params.id,
        name: params.name,
        dingId: params.ding_id,
        mobile: params.cellphone,
        rolesArray: params.roles.join(',')
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
    }

  }

  initForm($scope, $log, toastr, RSAKEY) {
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

    $log.log(encrypt);

    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);
      if(isValid) {
        $log.log(self.preParams('create', $scope.info, encrypt));
        self.$http({
          url: self.cfg.api.user.save.url,
          method: self.cfg.api.user.save.type,
          data: self.preParams('create', $scope.info, encrypt)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('新建成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('user');
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
        $log.log(self.preParams('edit', $scope.info, encrypt));
        self.$http({
          url: self.cfg.api.user.update.url,
          method: self.cfg.api.user.update.type,
          data: self.preParams('edit', $scope.info, encrypt)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('user');
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
        url: self.cfg.api.user.delete.url,
        method: self.cfg.api.user.delete.type,
        params: self.preParams('delete', $scope.info, encrypt)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.error('删除成功！');
          $scope.goview('user');
        } else if (response.data.result === 1) {
          toastr.error('处理失败，请重试');
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };

    $scope.resetPasswordSubmit = function(id) {
      $log.log('resetPassoword： ' + id);

      self.$http({
        url: self.cfg.api.user.reset.url,
        method: self.cfg.api.user.reset.type,
        params: self.preParams('reset', $scope.info, encrypt)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.success('重置成功！');
          $scope.goview('user');
        } else if (response.data.result === 1) {
          toastr.error('处理失败，请重试');
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }

}

