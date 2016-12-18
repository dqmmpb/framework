/**
 * Created by dengqiming on 06/12/2016.
 */

export function AuthDirective() {
  'ngInject';

  let directive = {
    templateUrl: 'app/components/auth/auth.html',
    scope: {
      authes: '=',
      type: '=',
      roleAuthes: '='
    },
    controller: AuthController,
    controllerAs: 'auth',
    transclude: true,
    replace: true
  };

  return directive;

}

class AuthController {
  constructor ($scope) {
    'ngInject';

    $scope.checkMM = function (mM) {
      for(var i in mM.sub) {
        mM.sub[i].ch = mM.ch;

        for(var j in mM.sub[i].auth) {
          mM.sub[i].auth[j].ch = mM.sub[i].ch;
        }
      }
    };

    $scope.checkSM = function (mM, sM) {
      for(var i in sM.auth) {
        sM.auth[i].ch = sM.ch;
      }

      if(!sM.ch)
        mM.ch = false;
      else {
        for(var j in mM.sub) {
          if(!mM.sub[j].ch) {
            mM.ch = false;
            return;
          }
        }
        mM.ch = true;
      }

    };

    $scope.checkAT = function(mM, sM, aT) {
      if(!aT.ch)
        sM.ch = false;
      else {
        for(var i in sM.auth) {
          if(!sM.auth[i].ch) {
            sM.ch = false;
            mM.ch = false;
            return;
          }
        }
        sM.ch = true;
      }
      if(!sM.ch)
        mM.ch = false;
      else {
        for(var j in mM.sub) {
          if(!mM.sub[j].ch) {
            mM.ch = false;
            return;
          }
        }
        mM.ch = true;
      }
    };

    $scope.$watch('roleAuthes', function() {
      for(var i in $scope.authes ) {
        if($scope.roleAuthes.indexOf($scope.authes[i].aT.id) !== -1) {
          $scope.authes[i].aT.ch = true;
          $scope.checkAT($scope.authes[i].mM, $scope.authes[i].sM, $scope.authes[i].aT);
        }
      }
    });
  }

}
