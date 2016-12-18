export class UserService {
  constructor ($log, $http) {
    'ngInject';

    this.$log = $log;
    this.$http = $http;
    this.apiHost = location.protocol + '//' + location.host;
  }

  getUsers(filter) {
    var args = Array.prototype.slice.call(arguments, 1);
    var _self = this;
    return this.$http.get(this.apiHost + '/app/components/user/user.json')
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
}
