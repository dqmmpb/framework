export class ModalProfitController {
  constructor($scope, $log, $http, $timeout, $state, $stateParams, toastr, cfg) {
    'ngInject';

    var $ctrl = this;

    $ctrl.cfg = cfg;
    $ctrl.$http = $http;
    $ctrl.toastr = toastr;

    $ctrl.type = $ctrl.resolve.type;
    $ctrl.info = $ctrl.resolve.info;
    $ctrl.form = {
      name: $ctrl.info.name,
      code: $ctrl.info.code
    };
    $ctrl.form.profits = {
      code: $ctrl.info.code,
      pct_charge: null,
      pct_consume: null
    };

    if ($ctrl.type == 'edit') {
      $ctrl.getData($ctrl);
    }

    $ctrl.initForm($log, toastr);

  }

  getData($scope) {

    $scope.form.profits = {
      code: $scope.info.code,
      pct_charge: null,
      pct_consume: null
    };

    var profitsSet = $scope.info.profitsSet;

    for (var profit in profitsSet) {
      if (profitsSet[profit].catagory === 0) {
        $scope.form.profits.pct_charge = profitsSet[profit].percent;
      } else if (profitsSet[profit].catagory === 1) {
        $scope.form.profits.pct_consume = profitsSet[profit].percent
      }
    }
  }

  setData($scope, result) {

    $scope.info.code = result.code;

    var profitsSet = $scope.info.profitsSet;

    var profit, flag = true;

    if(typeof result.chargePercent !== 'undefined' && result.chargePercent !== null) {
      flag = true;
      for (profit in profitsSet) {
        if (profitsSet[profit].catagory === 0) {
          profitsSet[profit].percent = result.chargePercent;
          flag = false;
          break;
        }
      }
      if(flag) {
        profitsSet.push({
          catagory: 1,
          percent: result.chargePercent
        })
      }
    }

    if(typeof result.waterbaPercent !== 'undefined' && result.waterbaPercent !== null) {
      flag = true;
      for (profit in profitsSet) {
        if (profitsSet[profit].catagory === 1) {
          profitsSet[profit].percent = result.waterbaPercent;
          flag = false;
          break;
        }
      }
      if(flag) {
        profitsSet.push({
          catagory: 1,
          percent: result.waterbaPercent
        })
      }
    }

  }
  ok(result) {

    this.setData(this, result);

    this.close({$value: result});
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  preParams(type, params, info) {

    if (type === 'create') {
      return {
        agentId: info.id,
        code: params.code,
        chargePercent: params.profits.pct_charge,
        waterbaPercent: params.profits.pct_consume
      };
    } else if (type === 'edit') {
      return {
        agentId: info.id,
        code: params.code,
        chargePercent: params.profits.pct_charge,
        waterbaPercent: params.profits.pct_consume
      };
    }

  }

  initForm($log, toastr) {

    var self = this;

    self.submit = function (type, isValid) {
      if (type === 'create') {
        self.setSubmit(isValid);
      } else if (type === 'edit') {
        self.editSubmit(isValid);
      }
    };

    self.setSubmit = function (isValid) {
      $log.log('create. isValid: ' + isValid);

      if (isValid) {
        self.$http({
          url: self.cfg.api.profit.save.url,
          method: self.cfg.api.profit.save.type,
          data: self.preParams('create', self.form, self.info)
        }).then((response) => {
          if (response.data.result === 0) {
            toastr.success('处理成功！');
            self.ok(response.data.data);
          } else if (response.data.result === 1) {
            toastr.error('处理失败，请重试');
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    };

    self.editSubmit = function (isValid) {
      $log.log('edit. isValid: ' + isValid);

      if (isValid) {
        self.$http({
          url: self.cfg.api.profit.update.url,
          method: self.cfg.api.profit.update.type,
          data: self.preParams('edit', self.form, self.info)
        }).then((response) => {
          if (response.data.result === 0) {
            toastr.success('处理成功！');
            self.ok(response.data.data);
          } else if (response.data.result === 1) {
            toastr.error('处理失败，请重试');
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    }

  }

}
