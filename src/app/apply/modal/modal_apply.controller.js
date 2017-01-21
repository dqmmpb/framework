export class ModalApplyController {
  constructor($scope, $log, $http, $timeout, $state, $stateParams, toastr, cfg) {
    'ngInject';

    var self = this;

    self.cfg = cfg;
    self.$http = $http;
    self.toastr = toastr;

    self.type = self.resolve.type;
    self.info = self.resolve.info;

    if (self.type == 'edit') {
      self.getData(self);
    }

    if (self.type == 'create') {
      self.infoForm = {
        corpId: null,
        id: null,
        secret: null,
        department_id: null,
        wangba_id: self.info.id,
        cashier_dept_id: null,
        apply_id: null,
        qrcode_path: null
      };
    }

    self.initForm($log, toastr, $scope);

  }

  getData($scope) {
    //console.log($scope.corpId)
    $scope.infoForm = {
      corpId: $scope.info.corpId,
      ticket_id: $scope.info.ticket_id,
      corpsecret: $scope.info.corpsecret,
      department_id: $scope.info.department_id,
      wangba_id: $scope.info.id,
      cashier_dept_id: $scope.info.cashier_dept_id,
      apply_id: $scope.info.apply_id,
      qrcode_path: $scope.info.qrcode_path
    };
  }

  setData($scope, result) {

    console.log(result.tickets)
    $scope.info.ticket_status = result.tickets.status;
    $scope.info.corpId = result.tickets.corpId;
    $scope.info.corpsecret = result.tickets.secret;
    $scope.info.department_id = result.tickets.departmentId;
    $scope.info.wangba_id = result.tickets.wangbaId;
    $scope.info.cashier_dept_id = result.tickets.cashierDeptId;
    $scope.info.apply_id = result.tickets.agentId;
    $scope.info.qrcode_path = result.tickets.qrcodeImgPath;

  }

  ok(result) {

    this.setData(this, result);

    this.close({$value: result});
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

  preParams(type, params) {

    if (type === 'create') {
      return {
        corpId: params.corpId,
        secret: params.corpsecret,
        departmentId: params.department_id,
        wangbaId: params.wangba_id,
        cashierDeptId: params.cashier_dept_id,
        agentId: params.apply_id,
        qrcodeImgPath: params.qrcode_path
      };
    } else if (type === 'edit') {
      return {
        corpId: params.corpId,
        id: params.ticket_id,
        secret: params.corpsecret,
        departmentId: params.department_id,
        wangbaId: params.wangba_id,
        cashierDeptId: params.cashier_dept_id,
        agentId: params.apply_id,
        qrcodeImgPath: params.qrcode_path
      };
    } else if (type === 'createQrcode') {
      return {
        id: params.id
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
        console.log(self.preParams('create', self.infoForm))
        self.$http({
          url: self.cfg.api.apply.save.url,
          method: self.cfg.api.apply.save.type,
          data: self.preParams('create', self.infoForm)
        }).then((response) => {
          if (response.data.result === 0) {
            toastr.success('处理成功！');
            self.ok(response.data.data);
          } else if (response.data.result === 1) {
            toastr.error(response.data.msg);
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
        console.log(self.preParams('edit', self.infoForm));
        self.$http({
          url: self.cfg.api.apply.update.url,
          method: self.cfg.api.apply.update.type,
          data: self.preParams('edit', self.infoForm)
        }).then((response) => {
          if (response.data.result === 0) {
            toastr.success('处理成功！');
            self.ok(response.data.data);
          } else if (response.data.result === 1) {
            toastr.error(response.data.msg);
          }
        }).catch((error) => {
          $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
          toastr.error('网络异常，请重试');
        });
      }
    }

    self.createQrcode = function ($event) {
      $log.log(self.preParams('createQrcode', {
        id: self.info.id
      }));
      self.$http({
        url: self.cfg.api.apply.newqrcode.url,
        method: self.cfg.api.apply.newqrcode.type,
        params: self.preParams('createQrcode', {
          id: self.info.id
        })
      }).then((response) => {
        if (response.data.result === 0) {
          self.infoForm.qrcode_path = response.data.data.codeImg;
          toastr.success('生成二维码成功！');
          //$scope.goview('apply');
        } else if (response.data.result === 1) {
          toastr.error(response.data.msg);
        }
      }).catch((error) => {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
        toastr.error('网络异常，请重试');
      });
    };
  }

}
