export class User2Controller {
  constructor ($scope, $log, $http, $location, $state, $stateParams, toastr, sidebarGroup, cfg, user2, profile, $uibModal) {
    'ngInject';

    this.cfg = cfg;
    this.$http = $http;
    this.toastr = toastr;
    this.isCollapse = false;

    $scope.cfg = cfg;
    $scope.loading = true;

    profile.getProfile().then((data)=> {

      $scope.profile = data;

      this.getSidebarGroups($scope, $state, sidebarGroup);

      this.initSearch($scope, $location, $state, $log);

      this.getPage($scope, $location, $state, $log, user2);

      this.goView($scope, $state, $stateParams);

      this.initOperation($scope, $state, $log, toastr, $uibModal);

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
    this.sidebarSelected = this.sidebarGroups[3].items[2];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
  }

  getPage($scope, $location, $state, $log, dataService, currentPage) {

    var searchParams = $location.search();

    currentPage = currentPage ? currentPage : searchParams.currentPage ? parseInt(searchParams.currentPage): 1;

    $scope.searchForm = {
      keyWord: searchParams.keyWord,
      doSearch: searchParams.doSearch
    };

    dataService.getPage(currentPage, $scope.searchForm).then((data)=> {
      $scope.oData = data;
      $scope.page = dataService.wrapperPage(data);

      for(var i = 0, il = $scope.page.list.length; i < il; i++) {
        $scope.page.list[i].ch = false;
      }

      $scope.page.chAll = false;

      $scope.checkAll = function (page) {
        for(var i in page.list) {
          page.list[i].ch = page.chAll;
        }
      };

      $scope.check = function(page, item) {
        if(!item)
          page.chAll = false;
        else {
          for(var i in page.list) {
            if(!page.list[i].ch) {
              page.chAll = false;
              return;
            }
          }
          page.chAll = true;
        }
      };

      $scope.totalItems = $scope.page.totalCount;
      $scope.currentPage = $scope.page.pageNumber;
      $scope.itemsPerPage = $scope.page.pageSize;
      $scope.pageCount = $scope.page.pageCount === 0 ? 1: $scope.page.pageCount;

      $scope.loading = false;

    });

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);

      //self.getPage($scope, $log, dataService, $scope.currentPage, $scope.searchForm);
      $state.go($scope.searchForm.doSearch ? 'user2.search' : 'user2.page', {
        keyWord: $scope.searchForm.keyWord,
        doSearch: $scope.searchForm.doSearch,
        currentPage: $scope.currentPage
      }, {
        reload: true
      });
    };

    $scope.maxSize = 5;
  }

  initSearch($scope, $location, $state, $log) {

    var searchParams = $location.search();

    $scope.searchForm = {
      keyWord: searchParams.keyWord,
      doSearch: searchParams.doSearch
    };

    $scope.currentPage = searchParams.currentPage;

    $scope.searchSubmit = function () {
      $scope.searchForm.doSearch = true;
      $log.log($scope.searchForm);
      $state.go('user2.search', {
        keyWord: $scope.searchForm.keyWord,
        doSearch: $scope.searchForm.doSearch,
        currentPage: 1
      }, {
        reload: true
      });
      //self.getPage($scope, $log, dataService, 1, $scope.searchForm);
    }
  }

  preParams(type, params) {

    if(type === 'delete') {
      return {
        id: params.id
      }
    }

  }

  initOperation($scope, $state, $log, toastr, $uibModal) {

    var self = this;

    $scope.getRoleToArray = function(roles, key) {
      if(angular.isArray(roles)) {
        return roles.map(function(item) {
          return item[key];
        });
      } else {
        return [];
      }
    };

    //$scope.getRoleToArrayWithFilter = function(roles, key, filters) {
    //  if(angular.isArray(roles)) {
    //    return roles.filter(function(item) {
    //      return filters.indexOf(item['id']) !== -1;
    //    }).map(function(item) {
    //      return item[key];
    //    });
    //  } else {
    //    return [];
    //  }
    //};

    $scope.operation = function(type, item) {

      if (type === 'delete') {
        $log.log('delete： ' + item.id);

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
              url: self.cfg.api.user2.delete.url,
              method: self.cfg.api.user2.delete.type,
              params: self.preParams('delete', item)
            }).then((response) => {
              if (response.data.result === 0) {
                toastr.success('删除成功！');
                $state.go($scope.searchForm.doSearch ? 'user2.search' : 'user2.page', {
                  keyWord: $scope.searchForm.keyWord,
                  doSearch: $scope.searchForm.doSearch,
                  currentPage: $scope.currentPage
                }, {
                  reload: true
                });
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
      }

    };

  }

}
