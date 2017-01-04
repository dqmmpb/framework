export class ProfileService {
  constructor($log, $http, cfg, toastr) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
    this.toastr = toastr;
  }

  getProfile() {
    var self = this;
    return self.$http({
      url: self.cfg.api.profile.detail.url,
      method: self.cfg.api.profile.detail.type
    }).then((response) => {
      if (response.data.result === 0) {
        console.log("profile2:+ response.data.data")
        console.log(response.data.data)
        return self.wrapper(response.data.data);
      } else {
        //console.log("profile2: "+ response.data.data)
        location.href = self.cfg.api.login.url;
      }
    }).catch((error) => {
      //console.log("profile3");
      location.href = self.cfg.api.login.url;
      this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    });
  }

  restructRoleSet(roleSet, resourceMap) {
    var self = this;
    for(var i in roleSet) {
      self.restructResource(roleSet[i].resourcesSet, resourceMap);
    }
    return resourceMap;
  }
  restructResource(resourcesSet, resourceMap) {
    var self = this;
    for(var i in resourcesSet) {
      resourceMap[resourcesSet[i].value] = resourcesSet[i];
      if(resourcesSet[i].childSet) {
        self.restructResource(resourcesSet[i].childSet, resourceMap);
      }
    }
    return resourceMap;
  }

  wrapper(data) {

    var self = this;

    var o = data;
    var x = {
      id: o.id,
      name: o.name,
      ding_id: o.dingId,
      role: o.roleSet ? o.roleSet : [],
      cellphone: o.mobile,
      resourcesMap: self.restructRoleSet(o.roleSet ? o.roleSet : [], {})
    };
    //console.log(x.resourcesMap);

    console.log(x);
    return x;
  }

  wrapperAll(data) {

    var self = this;

    var all = [];
    for (var i in data.list) {
      var o = data.list[i];
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
