export class SidebarGroupService {
  constructor ($log, $http) {
    'ngInject';
    this.$log = $log;
    this.$http = $http;
    this.apiHost = 'api host';
  }

  getGroups() {
    // return this.$http.get(this.apiHost + '/groups?per_page=' + limit)
    //   .then((response) => {
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    //   });
    return new Promise(function(resolve, reject) {
      var data = [
        {
          title: '我的工作台',
          icon: 'fa-dashboard'
        },
        {
          title: '话务管理',
          icon: 'fa-caret-down',
          items: [
            {
              title: '呼入管理',
              icon: 'fa-phone-square'
            },
            {
              title: '商户查询',
              icon: 'fa-cubes'
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
          title: '报表和结算',
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
      resolve(data);
    });
  }
}
