export class ApplyViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, cfg, apply, city, Upload, profile) {
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
        qrcode_path: null
      };

      if($scope.type === 'create') {

        this.initForm($scope, $log, toastr);

        this.initValidation($scope);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
        this.getData($scope, $log, $timeout, $state, $stateParams, toastr, apply, city, Upload, $scope.id);
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
    this.breads = sidebarGroup.getGroupItems(this.sidebarGroups[2].items[1]);
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

  getData($scope, $log, $timeout, $state, $stateParams, toastr, apply, city, Upload, id) {
    var self = this;
    $scope.loading = false;

    apply.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = apply.wrapper(data);

        self.initForm($scope, $log, toastr);
        //self.viewFile($scope);

        self.initValidation($scope);

        self.goView($scope, $state, $stateParams);
      }
    });
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
        wangbaId: params.wangbaId,
      };
    }

  }

  initForm($scope, $log, toastr) {
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
        $log.log(self.preParams('edit', $scope.info, $scope.id));
        self.$http({
          url: self.cfg.api.apply.update.url,
          method: self.cfg.api.apply.update.type,
          data: self.preParams('edit', $scope.info, $scope.id)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('保存成功！');
            $scope.goview('apply');
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
        url: self.cfg.api.apply.delete.url,
        method: self.cfg.api.apply.delete.type,
        data: self.preParams('delete', $scope.info, $scope.id)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.error('删除成功！');
          $scope.goview('apply');
        } else if (response.data.result === 1) {
          toastr.error('处理失败，请重试');
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };

    $scope.createQrcode = function($event) {
      $event.stopPropagation();
      $event.preventDefault();
      $log.log(self.preParams('createQrcode', {
        wangbaId: $scope.id
      }));
      self.$http({
        url: self.cfg.api.apply.newqrcode.url,
        method: self.cfg.api.apply.newqrcode.type,
        params: self.preParams('createQrcode', {
          wangbaId: $scope.id
        })
      }).then((response) => {
        if(response.data.result === 0) {
          $scope.info.qrcode_path = response.data.data.codeImg;
          toastr.success('生成二维码成功！');
          //$scope.goview('apply');
        } else if(response.data.result === 1) {
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
