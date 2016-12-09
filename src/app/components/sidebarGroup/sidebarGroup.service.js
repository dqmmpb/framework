export class SidebarGroupService {
  constructor ($log, $http) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.apiHost = 'http://localhost';

    this.data = [
      {
        title: '我的工作台',
        icon: 'fa-dashboard',
        href: this.apiHost + '/dashboard'
      },
      {
        title: '话务管理',
        icon: 'fa-caret-down',
        items: [
          {
            title: '呼入管理',
            icon: 'fa-phone-square',
            href: this.apiHost + '/phone-square'
          },
          {
            title: '商户查询',
            icon: 'fa-cubes',
            href: this.apiHost + '/cubes'
          },
          {
            title: '客户跟踪',
            icon: 'fa-first-order'
          },
          {
            title: '服务查询',
            icon: 'fa-cloud-download'
          },
          {
            title: '呼入记录',
            icon: 'fa-globe'
          },
          {
            title: '年检回访',
            icon: 'fa-address-book'
          }
        ]
      },
      {
        title: '调度管理',
        icon: 'fa-caret-down',
        items: [
          {
            title: '调度提醒',
            icon: 'fa-user'
          },
          {
            title: '调度分配',
            icon: 'fa-rmb'
          },
          {
            title: '调度修改',
            icon: 'fa-envelope'
          },
          {
            title: '救援回访',
            icon: 'fa-envelope'
          },
          {
            title: '回访修改',
            icon: 'fa-pencil'
          }
        ]
      },
      {
        title: '报表结算',
        icon: 'fa-caret-down',
        items: [
          {
            title: '呼入报表',
            icon: 'fa-pencil'
          },
          {
            title: '服务报表',
            icon: 'fa-shield'
          }
        ]
      },
      {
        title: '系统管理',
        icon: 'fa-caret-down',
        items: [
          {
            title: '员工管理',
            icon: 'fa-user'
          },
          {
            title: '权限管理',
            icon: 'fa-shield'
          }
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
