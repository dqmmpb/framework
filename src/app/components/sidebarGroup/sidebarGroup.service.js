export class SidebarGroupService {
  constructor ($log, $http) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.apiHost = this.apiHost = location.protocol + '//' + location.host;

    this.data = [
      {
        title: '我的工作台',
        icon: 'fa-dashboard',
        href: this.apiHost + '/home',
        sref: 'home'
      },
      {
        title: '渠道管理',
        icon: 'fa-caret-down',
        items: [
          {
            title: '代理商管理',
            icon: 'fa-phone-square',
            href: this.apiHost + '/proxy',
            sref: 'proxy'
          },
          {
            title: '分润设置',
            icon: 'fa-cubes',
            href: this.apiHost + '/profit',
            sref: 'profit'
          }
        ]
      },
      {
        title: '网吧部署',
        icon: 'fa-caret-down',
        items: [
          {
            title: '网吧管理',
            icon: 'fa-pencil',
            href: this.apiHost + '/deploy',
            sref: 'deploy'
          },
          {
            title: '应用部署',
            icon: 'fa-shield',
            href: this.apiHost + '/apply',
            sref: 'apply'
          }
        ]
      },
      {
        title: '系统设置',
        icon: 'fa-caret-down',
        items: [
          {
            title: '角色管理',
            icon: 'fa-users',
            href: this.apiHost + '/role',
            sref: 'role'
          },
          {
            title: '用户管理',
            icon: 'fa-shield',
            href: this.apiHost + '/user',
            sref: 'user'
          }/*,
          {
            title: '数据字典',
            icon: 'fa-envelope'
          },
          {
            title: '操作日志',
            icon: 'fa-pencil'
          }*/
        ]
      }
    ];

    this.sidebarData = this.initSidebarData(this.data, '');
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
    // return this.$http.get(this.apiHost + '/groups?per_page=' + limit)
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
    // return this.$http.get(this.apiHost + '/groups?per_page=' + limit)
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
