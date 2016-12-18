export class AuthService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = location.protocol + '//' + location.host;
  }

  getAuthes(filter) {
    var args = Array.prototype.slice.call(arguments, 1);
    var _self = this;
    return this.$http.get(this.apiHost + '/app/components/auth/auth.json')
      .then((response) => {
        if(angular.isFunction(filter))
          return filter.apply(_self, Array.prototype.concat(response, args));
        else
          return response.data;

      })
      .catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
  }

  idFilter(response, id) {
    var data = response.data;
    for(var i = 0; i < data.length; i++) {
      if(data[i].id === Number(id))
        return data[i];
    }
  }


  restructure(data) {
    var rsAuthes = [];

    if(angular.isArray(data)) {
      for(var i = 0, il = data.length; i < il; i++) {
        var jc = 0;
        for(var j = 0, jl = data[i].sub.length; j < jl; j++) {
          jc += data[i].sub[j].auth.length;
          for(var k = 0, kl = data[i].sub[j].auth.length; k < kl; k++) {
            var row = {};
            row.mM = data[i];
            row.mM.ch = false;
            if(k === 0) {
              row.sMFirst = true;
              if(j === 0) {
                row.mMFirst = true;
              }
            }
            row.sM = data[i].sub[j];
            row.sM.ch = false;
            row.aT = data[i].sub[j].auth[k];
            row.aT.ch = false;
            rsAuthes.push(row);
          }
          rsAuthes[rsAuthes.length - data[i].sub[j].auth.length].sM.rowspan = data[i].sub[j].auth.length;
        }
        rsAuthes[rsAuthes.length - jc].mM.rowspan = jc;
      }

      return rsAuthes;
    } else if(angular.isObject(data)) {
      return data;
    }
  }

  getRestructureAuthes(filter) {
    var args = Array.prototype.slice.call(arguments, 1);
    var _self = this;
    return this.$http.get(this.apiHost + '/app/components/auth/auth.json')
      .then((response) => {
        if(angular.isFunction(filter))
          return _self.restructure(filter.apply(_self, Array.prototype.concat(response, args)));
        else
          return _self.restructure(response.data);

      })
      .catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
  }

}
