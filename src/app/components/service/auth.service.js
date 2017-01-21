export class AuthService {
  constructor($log, $http, cfg) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
  }

  restructure(data) {
    var rsAuthes = [];

    if (angular.isArray(data)) {
      for (var i = 0, il = data.length; i < il; i++) {
        var jc = 0;
        for (var j = 0, jl = data[i].sub.length; j < jl; j++) {
          var flag = data[i].sub[j].auth.length;
          if(flag) {
            for (var k = 0, kl = data[i].sub[j].auth.length; k < kl; k++) {
              var row = {};
              row.mM = data[i];
              row.mM.ch = false;
              if (k === 0) {
                row.sMFirst = true;
                if (j === 0) {
                  row.mMFirst = true;
                }
              }
              row.sM = data[i].sub[j];
              row.sM.ch = false;
              row.aT = data[i].sub[j].auth[k];
              row.aT.ch = false;
              rsAuthes.push(row);
            }
          } else {
            flag = 1;
            var row = {};
            row.mM = data[i];
            row.mM.ch = false;
            row.mM.colspan = 2;
            row.sMFirst = true;
            if (j === 0) {
              row.mMFirst = true;
            }
            row.sM = data[i].sub[j];
            row.sM.displayNone = true;
            row.sM.ch = false;
            row.aT = data[i].sub[j];
            row.aT.ch = false;
            rsAuthes.push(row);
          }
          jc += flag;

          if (rsAuthes.length > 0 && rsAuthes.length >= flag && flag > 0) {
            rsAuthes[rsAuthes.length - flag].sM.rowspan = flag;
          }
        }
        if (rsAuthes.length > 0 && rsAuthes.length >= jc && jc > 0) {
          rsAuthes[rsAuthes.length - jc].mM.rowspan = jc;
        }
      }

      return rsAuthes;
    } else if (angular.isObject(data)) {
      return data;
    }
  }

  getAll() {

    var self = this;
    return self.$http({
      url: self.cfg.api.auth.all.url,
      method: self.cfg.api.auth.all.type
    }).then((response) => {
      if (response.data.result === 0) {
        return response.data.data;
      }
    }).catch((error) => {
      this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    });
  }

  wrapperAll(data) {

    var o = data;
    var x = [];
    for (var i = 0, il = o.length; i < il; i++) {
      var mM = {
        id: o[i].id,
        pid: o[i].pid,
        name: o[i].name,
        value: o[i].value,
        desc: o[i].remark,
        sub: []
      };
      for (var j = 0, jl = o[i].childSet.length; j < jl; j++) {
        var sM = {
          id: o[i].childSet[j].id,
          pid: o[i].childSet[j].pid,
          name: o[i].childSet[j].name,
          value: o[i].childSet[j].value,
          desc: o[i].childSet[j].remark,
          auth: []
        };
        for (var k = 0, kl = o[i].childSet[j].childSet.length; k < kl; k++) {
          var auth = {
            id: o[i].childSet[j].childSet[k].id,
            pid: o[i].childSet[j].childSet[k].pid,
            name: o[i].childSet[j].childSet[k].name,
            value: o[i].childSet[j].childSet[k].value,
            desc: o[i].childSet[j].childSet[k].remark
          };
          sM.auth.push(auth);
        }
        mM.sub.push(sM);
      }

      x.push(mM);
    }

    return x;
  }

}
