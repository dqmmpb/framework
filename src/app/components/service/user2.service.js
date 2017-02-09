export class User2Service {
  constructor($log, $http, cfg, toastr) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
    this.toastr = toastr;
  }

  getAll() {
    var self = this;
    return self.$http({
      url: self.cfg.api.wangbaUsers.all.url,
      method: self.cfg.api.wangbaUsers.all.type
    }).then((response) => {
      if (response.data.result === 0) {
        return response.data.data;
      }
    }).catch((error) => {
      this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    });
  }

  getPage(pageNum = 1, searchForm) {

    var self = this;

    if(searchForm && searchForm.doSearch) {
      return self.$http({
        url: self.cfg.api.wangbaUsers.search.url,
        method: self.cfg.api.wangbaUsers.search.type,
        params: {
          pageNum: pageNum,
          keyWord: searchForm.keyWord
        }
      }).then((response) => {
        if (response.data.result === 0) {
          return response.data.data;
        }
      }).catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
    } else {
      return self.$http({
        url: self.cfg.api.wangbaUsers.list.url,
        method: self.cfg.api.wangbaUsers.list.type,
        params: {
          pageNum: pageNum
        }
      }).then((response) => {
        if (response.data.result === 0) {
          return response.data.data;
        }
      }).catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
    }

  }

  getDetail(id) {

    var self = this;

    return self.$http({
      url: self.cfg.api.wangbaUsers.detail.url,
      method: self.cfg.api.wangbaUsers.detail.type,
      params: {
        id: id
      }
    }).then((response) => {
      if (response.data.result === 0) {
        return response.data.data;
      }
    }).catch((error) => {
      this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    });
  }

  restructRoleSet(roleSet) {

    var filters = [4, 5, 6];

    if(angular.isArray(roleSet)) {
      return roleSet.filter(function(item) {
        return filters.indexOf(item['id']) !== -1;
      });
    } else {
      return [];
    }
  }

  wrapper(data) {

    var self = this;

    var o = data;
    var x = {
      id: o.id,
      name: o.name,
      ding_id: o.dingId,
      role: self.restructRoleSet(o.roleSet ? o.roleSet : []),
      cellphone: o.mobile,
      code: o.code,
      bossWangbas: o.bossWangbas ? o.bossWangbas : null
    };
    return x;
  }

  wrapperAll(data) {

    var self = this;

    var all = [];
    for (var i in data) {
      var o = data[i];
      var x = self.wrapper(o);
      all.push(x);
    }

    return all;
  }

  wrapperPage(data) {

    var self = this;

    let page = {
      legalColumn: data.legalColumn,
      legalSort: data.legalSort,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalCount: data.totalCount,
      pageCount: data.pageCount,
      orderBy: data.orderBy,
      orderType: data.orderType,
      list: []
    };

    for (var i in data.list) {
      var o = data.list[i];
      var x = self.wrapper(o);
      page.list.push(x);
    }

    if(page.list.length < page.pageSize) {
      for(var j = 0, jl = page.pageSize - page.list.length; j < jl; j++ ) {
        page.list.push({
          empty: true
        });
      }
    }

    return page;
  }
}
