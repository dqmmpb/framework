export class ProfitController {
  constructor ($scope, $log, $http, $timeout, $location, $state, $stateParams, toastr, sidebarGroup, cfg, city, profit, $uibModal, profile) {
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

      this.initSearch($scope, $location, $state, $log, $timeout, city);

      this.getPage($scope, $location, $state, $log, profit);

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
    this.sidebarSelected = this.sidebarGroups[1].items[1];
    this.breads = sidebarGroup.getGroupItems(this.sidebarSelected);
  }

  getPage($scope, $location, $state, $log, dataService, currentPage) {

    var searchParams = $location.search();

    currentPage = currentPage ? currentPage : searchParams.currentPage ? parseInt(searchParams.currentPage): 1;

    $scope.searchForm = {
      keyWord: $scope.searchForm.keyWord,
      areaCode: $scope.searchForm.areaCode ? $scope.searchForm.areaCode : "100000",
      status: $scope.searchForm.status ? $scope.searchForm.status : -1,
      doSearch: $scope.searchForm.doSearch
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
      $state.go($scope.searchForm.doSearch ? 'profit.search' : 'profit.page', {
        keyWord: $scope.searchForm.keyWord,
        areaCode: $scope.searchForm.areaCode ? $scope.searchForm.areaCode : "100000",
        status: $scope.searchForm.status ? $scope.searchForm.status : -1,
        doSearch: $scope.searchForm.doSearch,
        currentPage: $scope.currentPage
      }, {
        reload: true
      });
    };

    $scope.maxSize = 5;
  }

  getCityString(cities, separator) {
    if(cities) {
      if(separator)
        return cities.join(separator);
      else
        return cities.join(' ');
    }
  }

  initSearch($scope, $location, $state, $log, $timeout, city) {

    var searchParams = $location.search();

    $scope.searchForm = {
      keyWord: searchParams.keyWord,
      areaCode: searchParams.areaCode ? searchParams.areaCode : "100000",
      status: searchParams.status ? searchParams.status : -1,
      doSearch: searchParams.doSearch
    };

    $scope.currentPage = searchParams.currentPage;

    $scope.statuses = [
      {
        value: -1,
        name: "全部状态"
      },{
        value: 0,
        name: "待设置"
      },
      {
        value: 1,
        name: "已设置"
      }
    ];

    city.getCities(city.provinceFilter).then((data)=> {

      $scope.loading = false;

      $timeout(function() {
        data.c.unshift({
          n: '全部',
          i: '100000'
        });
        angular.element('.select-group-province').each(function() {
          angular.element(this).selectizeCity({
            data: data,
            names: ['province'],
            items: [$scope.searchForm.areaCode ? $scope.searchForm.areaCode : "100000"] || [],
            onChange: function($self) {
              var selectedObject = $self.selectedObject();
              var selectedLabel = $self.selectedLabel();
              var selectedValue = $self.selectedValue();
              $log.log(selectedObject, selectedLabel, selectedValue);
              $scope.searchForm.areaCode = selectedValue.join('');
            }
          });
        });

        angular.element('.input-select').each(function() {
          angular.element(this).selectize({
            options: $scope.statuses,
            items: [$scope.searchForm.status] || [],
            labelField: 'name',
            valueField: 'value',
            maxItems: 1,
            placeholder: '全部状态',
            onChange: function (value) {
              $scope.searchForm.status = value;
            }
          });
        });

      }, 10);

    });

    $scope.searchSubmit = function () {
      $scope.searchForm.doSearch = true;
      $state.go('profit.search', {
        keyWord: $scope.searchForm.keyWord,
        areaCode: $scope.searchForm.areaCode ? $scope.searchForm.areaCode : "100000",
        status: $scope.searchForm.status ? $scope.searchForm.status : -1,
        doSearch: $scope.searchForm.doSearch,
        currentPage: 1
      }, {
        reload: true
      });
      //self.getPage($scope, $log, dataService, 1, $scope.searchForm);
    }
  }

  initOperation($scope, $state, $log, toastr, $uibModal) {

    $scope.operation = function(type, item) {

      if(type === 'create') {
        var modalInstance = $uibModal.open({
          animation: false,
          component: 'modalComponent',
          backdrop: 'static',
          windowClass: 'modal-profit',
          resolve: {
            type: function() {
              return type;
            },
            info: function() {
              return item;
            }
          }
        });

        modalInstance.result.then(function (result) {
          $log.log(result);
        }, function () {
          $log.info('modal-component dismissed at: ' + new Date());
        });
      } else if(type === 'edit') {
        var modalInstance = $uibModal.open({
          animation: false,
          component: 'modalComponent',
          backdrop: 'static',
          windowClass: 'modal-profit',
          resolve: {
            type: function() {
              return type;
            },
            info: function() {
              return item;
            }
          }
        });

        modalInstance.result.then(function (result) {
          $log.log(result);
        }, function () {
          $log.info('modal-component dismissed at: ' + new Date());
        });
      }
    }

  }

}
