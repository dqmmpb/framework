export class ProfitViewController {
  constructor ($scope, $log, $http, $state, $stateParams, toastr, sidebarGroup, cfg, profit, profile) {
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
          }]
      };

      $scope.mform = {
        name: $scope.info.name,
        code: $scope.info.code
      };
      $scope.mform.profits = {
        code: $scope.info.code,
        //pct_charge: null,
        //pct_consume: null,
        pct_quick: null
      };


      if($scope.type === 'create') {
        this.getData($scope, $log, $state, $stateParams, toastr, profit, $scope.id);
      } else if($scope.type === 'view' || $scope.type === 'edit' || $scope.type === 'apply') {
        this.getData($scope, $log, $state, $stateParams, toastr, profit, $scope.id);
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
    this.sidebarSelected = this.sidebarGroups[1].items[1];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
    if($scope.type === 'create')
      this.breads.push({
        title: '设置分润'
      });
    else if($scope.type === 'view')
      this.breads.push({
        title: '查看分润'
      });
    else if($scope.type === 'edit')
      this.breads.push({
        title: '编辑分润'
      });
  }

  initValidation() {

  }

  getData($scope, $log, $state, $stateParams, toastr, profit, id) {
    var self = this;
    profit.getDetail(id).then((data)=> {
      if(data) {
        $scope.oData = data;
        $scope.info = profit.wrapper(data);

        console.log($scope.info);

        $scope.mform.code =  $scope.info.code;
        $scope.mform.profits = {
          //pct_charge: null,
          //pct_consume: null,
          pct_quick: null
        };

        var profitsSet = $scope.info.profitsSet;

        for (var i in profitsSet) {
          if (profitsSet[i].catagory === 0) {
            $scope.mform.profits.pct_charge = profitsSet[i].percent;
          } else if (profitsSet[i].catagory === 1) {
            $scope.mform.profits.pct_consume = profitsSet[i].percent
          } else if (profitsSet[i].catagory === 2) {
            $scope.mform.profits.pct_quick = profitsSet[i].percent
          }
        }

        self.initForm($scope, $log, toastr);
        self.viewFile($scope);

        $scope.loading = false;

        self.initValidation($scope, profit);

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

  preParams(type, params, info) {
    var self = this;

    if(type === 'create') {
      return {
        agentId: info.id,
        code: params.code,
        //chargePercent: params.profits.pct_charge,
        //waterbaPercent: params.profits.pct_consume,
        quickPercent: params.profits.pct_quick
      };
    } else if(type === 'edit') {
      return {
        agentId: info.id,
        code: params.code,
        //chargePercent: params.profits.pct_charge,
        //waterbaPercent: params.profits.pct_consume,
        quickPercent: params.profits.pct_quick
      };
    }

  }

  initForm($scope, $log, toastr) {

    var self = this;

    $scope.createSubmit = function(isValid) {
      $log.log('create. isValid: ' + isValid);
      if(isValid) {
        $log.log(self.preParams('create', $scope.mform, $scope.info));
        self.$http({
          url: self.cfg.api.profit.save.url,
          method: self.cfg.api.profit.save.type,
          data: self.preParams('create', $scope.mform, $scope.info)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('新建成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('profit');
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
        $log.log(self.preParams('edit', $scope.mform, $scope.info));
        self.$http({
          url: self.cfg.api.profit.update.url,
          method: self.cfg.api.profit.update.type,
          data: self.preParams('edit', $scope.mform, $scope.info)
        }).then((response) => {
          if(response.data.result === 0) {
            toastr.success('编辑成功！');
            if($scope.redirect_url)
              location.href = $scope.redirect_url;
            else
              $scope.goview('profit');
          } else if(response.data.result === 1) {
            toastr.error(response.data.msg);
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

  }

}
