export class CityService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = "http://localhost:3000";
  }

  getCities(filter) {
    return this.$http.get(this.apiHost + '/app/components/city/city.min.json')
      .then((response) => {
        if(angular.isFunction(filter))
          return filter(response.data);
        else
          return response.data;

      })
      .catch((error) => {
        this.$log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      });
  }

  provinceFilter(data) {
    var province = {};
    province.i = data.i;
    province.n = data.n;
    province.c = [];
    for(var p in data.c) {
      var prov = {
        i: data.c[p].i,
        n: data.c[p].n
      }
      province.c.push(prov);
    }
    //angular.copy(data, provinces);
    console.log(province);
    return province;
  }
}
