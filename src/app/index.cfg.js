var HTTP_TYPE = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT"
};

var RSAKEY = {
  RSA_KEY: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzwYuXTPEtWV49OS/Cb5QIbX2LtZBHhCi9hiR2hrJEcWA4vUmC8GsMMOKw933VxAurjw1Llhj4QXpKZi9hfOlc6bn7GoyAZpVgl+JAzwQFuTOSJyRacgGDef0BY0zW/kQZjILI7ovqXwAcSaOGhFQgy6OWAkNDeKqGQFXeMwr9owIDAQAB',
  PRI_KEY: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALPBi5dM8S1ZXj05L8JvlAhtfYu1kEeEKL2GJHaGskRxYDi9SYLwawww4rD3fdXEC6uPDUuWGPhBekpmL2F86VzpufsajIBmlWCX4kDPBAW5M5InJFpyAYN5/QFjTNb+RBmMgsjui+pfABxJo4aEVCDLo5YCQ0N4qoZAVd4zCv2jAgMBAAECgYEAjlxHMEFodFDluLkUoPl7FJ2aI05dALajCU42jIQqpNfhq64FjSTYsqP4tMydJPIJiApYLjemeN5qeoepGJ0ztuU/QM56Q59c6S4nBxDhc619dvt9jABsompCl6yrPYzi3FG1TmJa4ugBOln+KS/Pw/aSaEu4E1CUOYgYuIljT1kCQQDWo9fwnEpdH2WoW4E1ARwuV++SfsV7szJtSIBEKuhIzRDLMEB97yoEffWVYgncou+XYXdMn5Eb0dkRP4u07ZUvAkEA1mThgvhz0gyM08GxaXIT/+9JskCuCvvcDTVJVhVebeK/y0rZGBsvIMuPux+6wy4S2qqj+BwjSfP+71JLrPopzQJAFx2aGe2bDKBfAFyqc5zk/hC2Wl6QwhuwaJiQR8cfMQf0sQ1HRMjHC6jNFAN08HATwYfbo0LkC8zzxanET/3uPQJBAKYaPJmzElC/xm/dVi2C47nbU3aWJAGAhkl5alsWbTWngr7nO3Ewxn+bFr18ZL8JODRQFn+IlVKbhn02fkkC/FUCQDD7cPsWeab+iJlam4gooS/suDryNqWQFFsuZDAuseDzQKpa7Qvd/5TH5eiiWpUoKCySjQapO+JXHjIb1PQm4Rw='
}

//var remoteServer = 'http://172.16.0.251:8080';
//var uploadServer = remoteServer;

//var remoteServer = 'http://yfl2.taofairy.com/wangbacms';
//var uploadServer = 'http://yfl2.taofairy.com';

var remoteServer = 'http://s.taofairy.com/wangbacms';
var uploadServer = 'http://s.taofairy.com/';


var allCfg = {
  debug: true,
  server: {
    local: true,
    localServer: location.protocol + '//' + location.host,
    remoteServer: remoteServer
  },
  api: {
    local: true,
    localServer: 'app/components/data',
    remoteServer: remoteServer
  },
  upload: {
    local: true,
    localServer: location.protocol + '//' + location.host,
    remoteServer: uploadServer,
    localPath: '/assets/images/upload',
    remotePath: ''
  }
};

var api = allCfg.api;

api.localAPI = {
  login: {
    url: api.localServer  + '/home/login.json',
    type: HTTP_TYPE.GET
  },
  logout: {
    url: api.localServer  + '/home/logoutman.json',
    type: HTTP_TYPE.GET
  },
  upload:  {
    url: api.localServer  + '/agents/simUpload.json',
    type: HTTP_TYPE.GET
  },
  city: {
    list: {
      url: api.localServer + '/city/city.min.json',
      type: HTTP_TYPE.GET
    }
  },
  proxy: {
    all: {
      url: api.localServer + '/agents/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.localServer + '/agents/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/agents/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/agents/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/agents/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/agents/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.localServer + '/agents/search.json',
      type: HTTP_TYPE.GET
    },
    apply: {
      url: api.localServer + '/agents/audit.json',
      type: HTTP_TYPE.POST
    }
  },
  profit: {
    all: {
      url: api.localServer + '/bacProfits/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.localServer + '/bacProfits/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/bacProfits/showProfit.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/bacProfits/updateProfit.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/bacProfits/updateProfit.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/bacProfits/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.localServer + '/bacProfits/search.json',
      type: HTTP_TYPE.GET
    }
  },
  role: {
    userAll: {
      url: api.localServer + '/users/all.json',
      type: HTTP_TYPE.GET
    },
    wangbaUserAll: {
      url: api.localServer + '/wangbaUsers/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.localServer + '/rightRoles/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/rightRoles/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/rightRoles/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/rightRoles/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/rightRoles/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.localServer + '/rightRoles/search.json',
      type: HTTP_TYPE.GET
    }
  },
  auth: {
    all: {
      url: api.localServer + '/rightResources/all.json',
      type: HTTP_TYPE.GET
    }
  },
  user: {
    all: {
      url: api.localServer + '/users/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.localServer + '/users/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/users/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/users/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/users/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/users/delete.json',
      type: HTTP_TYPE.GET
    },
    reset: {
      url: api.localServer + '/users/reset.json',
      type: HTTP_TYPE.POST
    },
    search: {
      url: api.localServer + '/users/search.json',
      type: HTTP_TYPE.POST
    },
    mobilephone: {
      url: api.localServer + '/users/checkMobile.json',
      type: HTTP_TYPE.GET
    }
  },
  wangbaUsers: {
    all: {
      url: api.localServer + '/wangbaUsers/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.localServer + '/wangbaUsers/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/wangbaUsers/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/wangbaUsers/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/wangbaUsers/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/wangbaUsers/delete.json',
      type: HTTP_TYPE.GET
    },
    reset: {
      url: api.localServer + '/wangbaUsers/reset.json',
      type: HTTP_TYPE.POST
    },
    search: {
      url: api.localServer + '/wangbaUsers/search.json',
      type: HTTP_TYPE.POST
    },
    mobilephone: {
      url: api.localServer + '/wangbaUsers/checkMobile.json',
      type: HTTP_TYPE.GET
    }
  },
  deploy: {
    list: {
      url: api.localServer + '/wangbas/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/wangbas/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/wangbas/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/wangbas/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/wangbas/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.localServer + '/wangbas/search.json',
      type: HTTP_TYPE.GET
    },
    apply: {
      url: api.localServer + '/wangbas/audit.json',
      type: HTTP_TYPE.POST
    },
    all: {
      url: api.localServer + '/wangbas/all.json',
      type: HTTP_TYPE.GET
    }
  },
  apply: {
    list: {
      url: api.localServer + '/tickets/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.localServer + '/tickets/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.localServer + '/tickets/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.localServer + '/tickets/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.localServer + '/tickets/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.localServer + '/tickets/search.json',
      type: HTTP_TYPE.GET
    },
    active: {
      url: api.localServer + '/tickets/active.json',
      type: HTTP_TYPE.GET
    },
    qrcode: {
      url: api.localServer + '/tickets/qrcode.json',
      type: HTTP_TYPE.GET
    }
  },
  main: {
    all: {
      url: api.localServer + '/pays/fenrunTotal.json',
      type: HTTP_TYPE.GET
    }
  },
  profile: {
    detail: {
      url: api.localServer + '/home/hqh.json',
      type: HTTP_TYPE.GET
    }
  }
};

api.remoteAPI = {
  login: {
    url: api.remoteServer  + '/home/login.do',
    type: HTTP_TYPE.GET
  },
  logout: {
    url: api.remoteServer  + '/home/logoutman.do',
    type: HTTP_TYPE.GET
  },
  upload:  {
    url: api.remoteServer  + '/agents/sinUpload.json',
    type: HTTP_TYPE.GET
  },
  city: {
    list: {
      url: api.localServer + '/city/city.min.json',
      type: HTTP_TYPE.GET
    }
  },
  proxy: {
    all: {
      url: api.remoteServer + '/agents/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.remoteServer + '/agents/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/agents/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/agents/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/agents/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/agents/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/agents/search.json',
      type: HTTP_TYPE.GET
    },
    apply: {
      url: api.remoteServer + '/agents/audit.json',
      type: HTTP_TYPE.POST
    }
  },
  profit: {
    all: {
      url: api.remoteServer + '/bacProfits/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.remoteServer + '/bacProfits/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/bacProfits/showProfit.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/bacProfits/updateProfit.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/bacProfits/updateProfit.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/bacProfits/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/bacProfits/search.json',
      type: HTTP_TYPE.GET
    }
  },
  role: {
    userAll: {
      url: api.remoteServer + '/users/all.json',
      type: HTTP_TYPE.GET
    },
    wangbaUserAll: {
      url: api.remoteServer + '/wangbaUsers/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.remoteServer + '/rightRoles/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/rightRoles/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/rightRoles/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/rightRoles/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/rightRoles/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/rightRoles/search.json',
      type: HTTP_TYPE.GET
    }
  },
  auth: {
    all: {
      url: api.remoteServer + '/rightResources/all.json',
      type: HTTP_TYPE.GET
    }
  },
  user: {
    all: {
      url: api.remoteServer + '/users/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.remoteServer + '/users/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/users/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/users/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/users/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/users/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/users/search.json',
      type: HTTP_TYPE.GET
    },
    reset: {
      url: api.remoteServer + '/users/changePasswordForOther.json',
      type: HTTP_TYPE.POST
    },
    mobilephone: {
      url: api.remoteServer + '/users/checkMobile.json',
      type: HTTP_TYPE.GET
    }
  },
  wangbaUsers: {
    all: {
      url: api.remoteServer + '/wangbaUsers/all.json',
      type: HTTP_TYPE.GET
    },
    list: {
      url: api.remoteServer + '/wangbaUsers/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/wangbaUsers/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/wangbaUsers/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/wangbaUsers/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/wangbaUsers/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/wangbaUsers/search.json',
      type: HTTP_TYPE.GET
    },
    reset: {
      url: api.remoteServer + '/wangbaUsers/changePasswordForOther.json',
      type: HTTP_TYPE.POST
    },
    mobilephone: {
      url: api.remoteServer + '/wangbaUsers/checkMobile.json',
      type: HTTP_TYPE.GET
    }
  },
  deploy: {
    list: {
      url: api.remoteServer + '/wangbas/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/wangbas/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/wangbas/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/wangbas/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/wangbas/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/wangbas/search.json',
      type: HTTP_TYPE.GET
    },
    apply: {
      url: api.remoteServer + '/wangbas/audit.json',
      type: HTTP_TYPE.POST
    },
    all: {
      url: api.remoteServer + '/wangbas/all.json',
      type: HTTP_TYPE.GET
    }
  },
  apply: {
    list: {
      url: api.remoteServer + '/tickets/index.json',
      type: HTTP_TYPE.GET
    },
    detail: {
      url: api.remoteServer + '/tickets/detail.json',
      type: HTTP_TYPE.GET
    },
    save: {
      url: api.remoteServer + '/tickets/save.json',
      type: HTTP_TYPE.POST
    },
    update: {
      url: api.remoteServer + '/tickets/update.json',
      type: HTTP_TYPE.POST
    },
    delete: {
      url: api.remoteServer + '/tickets/delete.json',
      type: HTTP_TYPE.GET
    },
    search: {
      url: api.remoteServer + '/tickets/search.json',
      type: HTTP_TYPE.GET
    },
    active: {
      url: api.remoteServer + '/tickets/active.json',
      type: HTTP_TYPE.GET
    },
    qrcode: {
      url: api.remoteServer + '/tickets/qrcode.json',
      type: HTTP_TYPE.GET
    }
  },
  main: {
    all: {
      url: api.remoteServer + '/pays/fenrunTotal.json',
      type: HTTP_TYPE.GET
    }
  },
  profile: {
    detail: {
      url: api.remoteServer + '/home/hqh.json',
      type: HTTP_TYPE.GET
    }
  }
};


var cfg = {};

if(allCfg.server.local)
  cfg.server = allCfg.server.localServer;
else
  cfg.server = allCfg.server.remoteServer;

if(allCfg.api.local) {
  cfg.apiserver = allCfg.api.localServer;
  cfg.api = allCfg.api.localAPI;
} else {
  cfg.apiserver = allCfg.api.remoteServer;
  cfg.api = allCfg.api.remoteAPI;
}


if(allCfg.upload.local) {
  cfg.uploadServer = allCfg.upload.localServer;
  cfg.uploadPath = allCfg.upload.localServer + allCfg.upload.localPath;
} else {
  cfg.uploadServer = allCfg.upload.remoteServer;
  cfg.uploadPath = allCfg.upload.remoteServer + allCfg.upload.remotePath;
}

cfg.sidebarData = [
  {
    title: '管理中心',
    icon: 'fa-dashboard',
    sref: 'home',
    resource: '/home',
    leaf: true
  },
  {
    title: '渠道管理',
    icon: 'fa-caret-down',
    leaf: false,
    sref: 'agents',
    resource: '/qudao',
    items: [
      {
        title: '代理商管理',
        icon: 'fa-user-secret',
        sref: 'proxy',
        resource: '/agents',
        leaf: true
      },
      {
        title: '分润设置',
        icon: 'fa-rmb',
        sref: 'profit',
        resource: '/bacProfits',
        leaf: true
      }
    ]
  },
  {
    title: '网吧部署',
    icon: 'fa-caret-down',
    leaf: false,
    sref: 'bushu',
    resource: '/bushu',
    items: [
      {
        title: '网吧管理',
        icon: 'fa-desktop',
        sref: 'deploy',
        resource: '/wangbas',
        leaf: true
      },
      {
        title: '应用部署',
        icon: 'fa-cloud-upload',
        sref: 'apply',
        resource: '/tickets',
        leaf: true
      }
    ]
  },
  {
    title: '系统设置',
    icon: 'fa-caret-down',
    leaf: false,
    sref: 'system',
    resource: '/system',
    items: [
      {
        title: '角色管理',
        icon: 'fa-users',
        sref: 'role',
        resource: '/rightRoles',
        leaf: true
      },
      {
        title: '用户管理',
        icon: 'fa-user-circle',
        sref: 'user',
        resource: '/users',
        leaf: true
      },
      {
        title: '网吧用户管理',
        icon: 'fa-grav',
        sref: 'user2',
        resource: '/wangbaUsers',
        leaf: true
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

cfg.hasAuth = function(profile, url) {
  //return true;
  var self = this;
  var resourcesMap = profile && profile.resourcesMap;

  if(resourcesMap && url) {
    var resourceUrl = url.replace(self.apiserver, '');
    if(resourcesMap && resourceUrl) {
      if(resourcesMap[resourceUrl]) {
        return true;
      }
    }
  }
  return false;
};

cfg.hasRoleId = function(roles, ids) {

  if(angular.isArray(roles)) {
    if (angular.isArray(ids)) {
      var flags = ids.map(function (id) {
        return roles.indexOf(id) !== -1 ? true : roles.indexOf(Number(id)) !== -1 ? true : false;
      });
      if (flags && flags.length > 0)
        return flags.reduce(function (prev, next) {
          return prev && next;
        });
    } else if (angular.isString(ids) || angular.isNumber(ids))
      return roles.indexOf(ids) !== -1 ? true : roles.indexOf(Number(ids)) !== -1 ? true : false;
  }

  return false;
};

cfg.countDown = function(options) {
  var self = this;
  var before = options.before;
  var step = options.step;
  var end = options.end;
  var count = options.count || 3000;
  var interval = options.interval || 1000;


  if(typeof before === 'function')
    before.apply(self, [count / interval]);

  var counter = setInterval(function() {
    if(count / interval > 1) {
      count -= interval;
      if(typeof step === 'function')
        step.apply(self, [count / interval]);
    } else {
      clearInterval(counter);
      if(typeof end === 'function')
        end.apply(this, [count / interval]);
    }
  }, interval);

  return counter;
};

export { HTTP_TYPE, RSAKEY, cfg };
