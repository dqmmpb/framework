export class ModalConfirmController {
  constructor($scope, $log, $http) {
    'ngInject';

    var self = this;

  }
  ok() {
    this.close({$value: 'ok'});
  }

  cancel() {
    this.dismiss({$value: 'cancel'});
  }

}

