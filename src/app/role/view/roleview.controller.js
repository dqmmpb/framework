export class RoleViewController {
  constructor ($scope, $log, $http, $state, $stateParams, toastr, sidebarGroup, cfg, role, auth, profile) {
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
        value: null,
        desc: null,
        auth: null
      };

      $scope.getAuthIdArray = function(authes) {
        if(angular.isArray(authes)) {
          return authes.map(function(item) {
            return item.id;
          });
        } else {
          return [];
        }
      };

      if($scope.type === 'create') {
        this.initForm($scope, $log, toastr);

        this.getAuthes($scope, $log, auth);

        this.goView($scope, $state, $stateParams);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'reset') {
        this.getData($scope, $log, $state, $stateParams, toastr, role, auth, $scope.id);
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

  getAuthes($scope, $log, auth) {
    auth.getAll().then((data)=> {
      if(data) {
        $scope.oAuth = data;
        $scope.authes = auth.restructure(auth.wrapperAll(data));
        $scope.loading = false;
      }
    });
  }

  getData($scope, $log, $state, $stateParams, toastr, role, auth, id) {
    var self = this;
    role.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = role.wrapper(data);
        $scope.info.authes = $scope.getAuthIdArray($scope.info.auth);

        self.initForm($scope, $log, toastr);

        self.getAuthes($scope, $log, auth);

        self.goView($scope, $state, $stateParams);
      }
    });
  }

  restructureAuth(authes) {

    var newAuth = [];
    for(var auth in authes) {
      if(authes[auth].aT.ch) {
        newAuth.push(authes[auth].aT.id);
      }
    }
    return newAuth;
  }

  preParams(type, params, authes) {
    var self = this;

    if(type === 'create') {
      return {
        name: params.name,
        value: params.value,
        remark: params.desc,
        resourceArray: self.restructureAuth(authes).join(',')
      };
    } else if(type === 'edit') {
      return {
        id: params.id,
        name: params.name,
        value: params.value,
        remark: params.desc,
        resourceArray: self.restructureAuth(authes).join(',')
      };
    } else if(type === 'delete') {
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
        $log.log(self.preParams('create', $scope.info, $scope.authes));
        self.$http({
          url: self.cfg.api.role.save.url,
          method: self.cfg.api.role.save.type,
          data: self.preParams('edit', $scope.info, $scope.authes)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('新建成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('role');
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
        $log.log(self.preParams('edit', $scope.info, $scope.authes));
        self.$http({
          url: self.cfg.api.role.update.url,
          method: self.cfg.api.role.update.type,
          data: self.preParams('edit', $scope.info, $scope.authes)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('role');
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
        url: self.cfg.api.role.delete.url,
        method: self.cfg.api.role.delete.type,
        params: self.preParams('delete', $scope.info, $scope.authes)
      }).then((response) => {
        if (response.data.result === 0) {
          toastr.error('删除成功！');
          if($scope.redirect_url)
            location.href = $scope.redirect_url;
          else
            $scope.goview('role');
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
