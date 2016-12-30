export class SidebarGroupService {
  constructor ($log, $http, cfg) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;

  }

  init(data, preId) {
    this.sidebarData = this.initSidebarData(data, preId);
  }

  initSidebarData(data, preId) {
    if(data) {
      for(var i = 0; i < data.length; i++) {
        data[i].id = preId + i;
        this.initSidebarData(data[i].items, data[i].id + '_');
      }
      return data;
    }
  }

  getGroups() {
    // return this.$http.get(this.cfg.server + '/groups?per_page=' + limit)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    //   });

    var self = this;

    return new Promise(function(resolve, reject) {
      if(self.sidebarData) {
        resolve(self.sidebarData);
      } else {
        reject(self.sidebarData);
      }
    });
  }

  getGroupsWithoutPromise() {
    // return this.$http.get(this.cfg.server + '/groups?per_page=' + limit)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    //   });

    var self = this;

    return self.sidebarData;
  }

  getGroupItems(item) {
    var self = this;

    // return new Promise(function(resolve, reject) {
    //   if(self.sidebarData && item) {
    //     resolve(self.getGroupItemPath(item));
    //   } else {
    //     reject(self.sidebarData);
    //   }
    // });
    return self.getGroupItemPath(item);
  }

  getItemPath(items, gIdIndexes, index, result) {
    if(items) {
      var sDi = items[gIdIndexes[index]];
      if(sDi) {
        result.push(sDi);
        this.getItemPath(sDi.items, gIdIndexes, index + 1, result);
      }
    }
  }

  getGroupItemPath(item) {
    var self = this;
    var result = [];
    if(self.sidebarData && item && item.id) {
      var gIdIndexes = item.id.split('_');
      this.getItemPath(self.sidebarData, gIdIndexes, 0, result);
    }
    return result;
  }
}
