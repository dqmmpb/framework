export class CityService {
  constructor($log, $http, cfg) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.cfg = cfg;
  }

  getCities(filter) {

    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    return self.$http({
      url: self.cfg.api.city.list.url,
      method: self.cfg.api.city.list.type
    }).then((response) => {
      if (angular.isFunction(filter))
        return filter.apply(self, Array.prototype.concat(response, args));
      else
        return response.data;
    }).catch((error) => {
      this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
    });
  }

  provinceFilter(response) {
    var data = response.data;
    var province = {};
    province.i = data.i;
    province.n = data.n;
    province.c = [];
    for (var p in data.c) {
      var prov = {
        i: data.c[p].i,
        n: data.c[p].n
      };
      province.c.push(prov);
    }
    return province;
  }
}
