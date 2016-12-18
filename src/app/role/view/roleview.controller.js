export class RoleViewController {
  constructor ($scope, $log, $http, $timeout, $state, $stateParams, toastr, sidebarGroup, role, auth) {
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
      role_name: null,
      role_desc: null,
      role_auth: null
    };

    this.getAuthes($scope, $log, auth);

    if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'reset') {
      this.getRole($scope, $log, role, $scope.id, auth);
    }

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

  getAuthes($scope, $log, auth) {
    var self = this;
    auth.getRestructureAuthes().then((data)=> {
      self.authes = data;
    });
  }

  getRole($scope, $log, role, id) {
    role.getRoles(role.idFilter, id).then((data)=> {
      if(data)
        $scope.info = {
          role_id: data.id,
          role_name: data.name,
          role_desc: data.desc,
          role_auth: data.auth
        };

      //auth.setRoleAuthes($scope.info.role_auth);
      //console.log($scope.info.role_auth);
    });
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
