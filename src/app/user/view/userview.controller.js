export class UserViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, role, user) {
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
      user_id: null,
      user_idx: null,
      user_name: null,
      user_dd: null,
      user_role: null,
      user_cellphone: null
    };

    if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'reset') {
      this.getUser($scope, $log, user, $scope.id);
    }

    this.getRoles($scope, $log, role);
    this.initForm($scope, $http, $log);

    $scope.gouserview = function(type, id) {
      $state.go('userview', {
        type: type,
        id: id,
        redirect_url: encodeURIComponent(location.href)
      });
    };

    $scope.redirect_url = $stateParams.redirect_url ? decodeURIComponent($stateParams.redirect_url): null;

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

  getUser($scope, $log, user, id) {
    user.getUsers(user.idFilter, id).then((data)=> {
      if(data)
        $scope.info = {
          user_id: data.id,
          user_idx: data.idx,
          user_name: data.name,
          user_dd: data.dd,
          user_role: data.role,
          user_cellphone: data.cellphone
        };
    });
  }

  getRoles($scope, $log, role) {

    role.getRoles().then((data)=> {
      angular.element('.input-select').each(function() {
        angular.element(this).selectize({
          options: data,
          labelField: 'name',
          valueField: 'name'
        });
      });
    });
  }

  initForm($scope, $http, $log) {
    var self = this;
    $scope.createSubmit = function() {
      $log.log('create');
      // 处理提交前的表单数据
      var params = {
        user_name: $scope.info.user_name
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
        user_name: $scope.info.user_name
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
        user_name: $scope.info.user_name
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

    $scope.resetPasswordSubmit = function(id) {
      $log.log('reset password: ' + id);
      // 处理提交前的表单数据
      var params = {
        id: id,
        user_name: $scope.info.user_name
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
