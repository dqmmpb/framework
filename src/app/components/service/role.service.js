export class RoleService {
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
      url: self.cfg.api.role.all.url,
      method: self.cfg.api.role.all.type
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
        url: self.cfg.api.role.search.url,
        method: self.cfg.api.role.search.type,
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
        url: self.cfg.api.role.list.url,
        method: self.cfg.api.role.list.type,
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
      url: self.cfg.api.role.detail.url,
      method: self.cfg.api.role.detail.type,
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

  wrapper(data) {

    var o = data;
    var x = {
      id: o.id,
      name: o.name,
      value: o.value,
      desc: o.remark,
      auth: o.resourcesSet ? o.resourcesSet : []
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
