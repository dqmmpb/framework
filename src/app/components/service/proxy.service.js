export class ProxyService {
  constructor($log, $http, cfg) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
  }

  getPage(pageNum = 1, searchForm) {
    var self = this;

    if(searchForm && searchForm.doSearch) {
      return self.$http({
        url: self.cfg.api.proxy.search.url,
        method: self.cfg.api.proxy.search.type,
        params: {
          pageNum: pageNum,
          keyWord: searchForm.keyWord,
          areaCode: searchForm.areaCode,
          status: searchForm.status
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
        url: self.cfg.api.proxy.list.url,
        method: self.cfg.api.proxy.list.type,
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
      url: self.cfg.api.proxy.detail.url,
      method: self.cfg.api.proxy.detail.type,
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

    var self = this;

    var o = data;

    var x = {
      id: o.id,
      name: o.name,
      code: o.code,
      areaCode: o.areaCode ? o.areaCode.split(',') : [],
      area: o.area ? o.area.split(','): [],
      // business_areaCode: o.business_areaCode,
      // business_area: o.business_area,
      address: o.address,
      cellphone: o.corporMobile,
      legal: o.corporName,
      status: o.status,
      is_same: o.isCorporReal === 0 ? true: false,
      real_name: o.realControlName,
      real_cellphone: o.realControlMobile,
      pcfile: null,
      rpcfile: null,
      blfile: null,
      affile: null,
      remark: o.remark
    };

    // 法人照片
    if (o.corporIdPic) {
      var pcfileArray = o.corporIdPic.split(',');
      x.pcfile = self.getFile(['正面', '反面'], pcfileArray, 2);
    } else {
      x.pcfile = self.getFile(['正面', '反面'], [], 2);
    }

    // 实际控制人照片
    if (o.realControlPic) {
      var rpcfileArray = o.realControlPic.split(',');
      x.rpcfile = self.getFile(['正面', '反面'], rpcfileArray, 2);
    } else {
      x.rpcfile = self.getFile(['正面', '反面'], [], 2);
    }

    // 实际控制人照片
    if (o.licencePic) {
      var blfileArray = o.licencePic.split(',');
      x.blfile = self.getFile([], blfileArray, 1);
    } else {
      x.blfile = self.getFile([], [], 1);
    }

    if (o.dingCertifyPic) {
      var affileArray = o.dingCertifyPic.split(',');
      x.affile = self.getFile(['页1', '页2', '页3', '页4'], affileArray, 4);
    } else {
      x.affile = self.getFile(['页1', '页2', '页3', '页4'], [], 4);
    }

    return x;
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

  getFile(captions, fileArray, size) {

    var self = this;

    var newArray = [];

    for (var i = 0; i < size; i++) {
      var oo = {};

      if (fileArray[i]) {
        oo.file = {
          serverData: {
            name: fileArray[i],
            url: self.cfg.uploadPath + '/' + fileArray[i]
          },
          noedit: true
        }
      } else {
        oo.file = null;
      }

      if (captions[i]) {
        oo.caption = captions[i]
      }

      newArray.push(oo);
    }

    return newArray;

  }

}
