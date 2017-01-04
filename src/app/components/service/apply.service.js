export class ApplyService {
  constructor($log, $http, cfg) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
  }

  getPage(pageNum = 1, searchForm) {
    var self = this;

    if (searchForm && searchForm.doSearch) {
      return self.$http({
        url: self.cfg.api.apply.search.url,
        method: self.cfg.api.apply.search.type,
        params: {
          pageNum: pageNum,
          keyWord: searchForm.keyWord,
          area: searchForm.area,
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
        url: self.cfg.api.apply.list.url,
        method: self.cfg.api.apply.list.type,
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
      url: self.cfg.api.apply.detail.url,
      method: self.cfg.api.apply.detail.type,
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

    var x;


    if (o.tickets) {
      x = {
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
        is_same: o.isCorporReal  === 0 ? true: false,
        real_name: null,
        real_cellphone: null,
        pcfile: null,
        rpcfile: null,
        blfile: null,
        affile: null,
        company_name: o.companyName,
        branch_name: o.branchName,
        ticket_id: o.tickets.id,
        ticket_status: o.tickets ? o.tickets.status : 3,
        corpId: o.tickets.corpId,
        corpsecret: o.tickets.secret,
        department_id: o.tickets.departmentId,
        wangba_id: o.tickets.wangbaId,
        cashier_dept_id: o.tickets.cashierDeptId,
        apply_id: o.tickets.agentId,
        qrcode_path: o.tickets.alipayQrcode,
        qrcodeImgPath: o.tickets.qrcodeImgPath
      };
    } else {
      x = {
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
        is_same: o.isCorporReal  === 0 ? true: false,
        real_name: null,
        real_cellphone: null,
        pcfile: null,
        rpcfile: null,
        blfile: null,
        affile: null,
        company_name: o.companyName,
        branch_name: o.branchName,
        ticket_status: 3,
        corpId: null,
        corpsecret: null,
        department_id: null,
        wangba_id: null,
        cashier_dept_id: null,
        apply_id: null,
        qrcode_path: null,
        qrcodeImgPath: null
      };
    }

    // 法人照片
    if (o.wangbas && o.wangbas.corporIdPic) {
      var pcfileArray = o.wangbas.corporIdPic.split(',');
      x.pcfile = self.getFile(['正面', '反面'], pcfileArray, 2);
    } else {
      x.pcfile = self.getFile(['正面', '反面'], [], 2);
    }

    // 实际控制人照片
    if (o.wangbas && o.wangbas.realControlPic) {
      var rpcfileArray = o.wangbas.realControlPic.split(',');
      x.rpcfile = self.getFile(['正面', '反面'], rpcfileArray, 2);
    } else {
      x.rpcfile = self.getFile(['正面', '反面'], [], 2);
    }

    // 实际控制人照片
    if (o.wangbas && o.wangbas.licencePic) {
      var blfileArray = o.wangbas.licencePic.split(',');
      x.blfile = self.getFile([], blfileArray, 1);
    } else {
      x.blfile = self.getFile([], [], 1);
    }

    if (o.wangbas && o.wangbas.dingCertifyPic) {
      var affileArray = o.wangbas.dingCertifyPic.split(',');
      x.affile = self.getFile([], affileArray, 1);
    } else {
      x.affile = self.getFile([], [], 1);
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
            url: self.cfg.uploadViewServer + '/' + fileArray[i]
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
