angular.module('ui.framework.auth', [])
  .controller('UibAuthController', function () {

    var vm = this;

    vm.checkMM = function (mM) {
      for (var i in mM.sub) {
        mM.sub[i].ch = mM.ch;

        for (var j in mM.sub[i].auth) {
          mM.sub[i].auth[j].ch = mM.sub[i].ch;
        }
      }
    };

    vm.checkSM = function (mM, sM) {
      for (var i in sM.auth) {
        sM.auth[i].ch = sM.ch;
      }

      if (!sM.ch)
        mM.ch = false;
      else {
        for (var j in mM.sub) {
          if (!mM.sub[j].ch) {
            mM.ch = false;
            return;
          }
        }
        mM.ch = true;
      }

    };

    vm.checkAT = function (mM, sM, aT) {
      if (!aT.ch)
        sM.ch = false;
      else {
        for (var i in sM.auth) {
          if (!sM.auth[i].ch) {
            sM.ch = false;
            mM.ch = false;
            return;
          }
        }
        sM.ch = true;
      }
      if (!sM.ch)
        mM.ch = false;
      else {
        for (var j in mM.sub) {
          if (!mM.sub[j].ch) {
            mM.ch = false;
            return;
          }
        }
        mM.ch = true;
      }
    };

    vm.reChecked = function () {
      for (var i in vm.authes) {
        if (vm.auth) {
          if (vm.auth.indexOf(vm.authes[i].aT.id) !== -1) {
            vm.authes[i].aT.ch = true;
            vm.checkAT(vm.authes[i].mM, vm.authes[i].sM, vm.authes[i].aT);
          }
        }
      }
    };

    vm.setAuthes = function(authes) {
      vm.authes = authes;
    };

    vm.setAuth = function(auth) {
      vm.auth = auth;
    };

  })
  .directive('uibAuth', function () {
    return {
      controller: 'UibAuthController',
      controllerAs: 'auth',
      restrict: 'A',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'app/components/auth/auth.html';
      },
      transclude: true,
      scope: {
        allAuthes: '=',
        roleAuth: '='
      },
      link: function(scope, element, attrs, authCtrl) {

        scope.disabled = !!attrs.disable;

        authCtrl.setAuthes(scope.allAuthes);
        authCtrl.setAuth(scope.roleAuth);
        authCtrl.reChecked();

        scope.checkMM = function(mM) {
          authCtrl.checkMM(mM);
        };
        scope.checkSM = function(mM, sM) {
          authCtrl.checkSM(mM, sM);
        };
        scope.checkAT = function (mM, sM, aT) {
          authCtrl.checkAT(mM, sM, aT);
        };
        scope.$watch('allAuthes', function () {
          authCtrl.setAuthes(scope.allAuthes);
          authCtrl.reChecked();
        });
        scope.$watch('roleAuth', function () {
          authCtrl.setAuth(scope.roleAuth);
          authCtrl.reChecked();
        });

      }
    };
  });
