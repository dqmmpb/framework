/**
 * Created by dengqiming on 06/12/2016.
 */

angular.module('validation', [])
  .directive('equalTo', function ($parse) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {

        // 解析表达式
        // <input type="password" ng-model="info.password" name="password" class="form-control" placeholder="登录密码" required>
        // <input type="password" ng-model="info.confirm" name="confirm" class="form-control" placeholder="确认登录密码" required equal-to="info.password">
        // 注意equal-to的表达式为password的ng-model而不是name
        var $pp = $parse(attrs.equalTo);

        function validator(value) {
          if (ctrl.$isEmpty(value)) {
            return null;
          }

          // 获取scope中对应表达式中的值
          var notEqual = value !== $pp(scope);
          ctrl.$setValidity('notEqual', !notEqual);
          return value ? value : undefined;
        }

        ctrl.$parsers.push(function (value) {
          return(validator(value));
        });

        ctrl.$formatters.push(function(value) {
          return(validator(value));
        });

        // 监听比较表达式值得变化
        scope.$watch(attrs.equalTo, function () {
          validator(ctrl.$viewValue);
        });
      }
    }
  });
