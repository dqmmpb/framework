
import { config } from './index.config';
import { cfg } from './index.cfg';
import { RSAKEY } from './index.cfg';
import { routerConfig } from './index.route';
import { httpProvider } from './index.httpprovider';
//import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyViewController } from './proxy/view/proxyview.controller';
import { ProfitController } from './profit/profit.controller';
import { ModalProfitController } from './profit/modal/modal_profit.controller.js';
import { ProfitViewController } from './profit/view/profitview.controller';
import { DeployController } from './deploy/deploy.controller';
import { DeployViewController } from './deploy/view/deployview.controller';
import { ApplyController } from './apply/apply.controller';
import { ModalApplyController } from './apply/modal/modal_apply.controller';
import { ModalConfirmController } from '../app/components/modal/modal_confirm.controller';
import { ApplyViewController } from './apply/view/applyview.controller';
import { RoleController } from './role/role.controller';
import { RoleViewController } from './role/view/roleview.controller';
import { UserController } from './user/user.controller';
import { UserViewController } from './user/view/userview.controller';
import { ProfileViewController } from './profile/view/profileview.controller';
import { MainService } from '../app/components/service/main.service';
import { SidebarGroupService } from '../app/components/sidebarGroup/sidebarGroup.service';
import { CityService } from '../app/components/service/city.service';
import { AuthService } from '../app/components/service/auth.service';
import { RoleService } from '../app/components/service/role.service';
import { UserService } from '../app/components/service/user.service';
import { ProfitService } from '../app/components/service/profit.service';
import { ProxyService } from '../app/components/service/proxy.service';
import { DeployService } from '../app/components/service/deploy.service';
import { ApplyService } from '../app/components/service/apply.service';
import { ProfileService } from '../app/components/service/profile.service';
import '../app/components/navbar/navbar.directive';
import '../app/components/sidebar/sidebar.directive';
import { BreadcrumbDirective } from '../app/components/breadcrumb/breadcrumb.directive';
import '../app/components/validation/equalTo.directive';
import '../app/components/auth/auth.directive';

angular.module('ui.framework',[ 'ui.framework.navbar', 'ui.framework.sidebar', 'ui.framework.breadcrumb', 'ui.framework.auth']);

angular.module('ui.framework.breadcrumb', [])
  .directive('uibBreadcrumb', BreadcrumbDirective);

angular.module('framework', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ngStorage', 'ngFileUpload', 'ui.framework', 'validation'])
  .constant('cfg', cfg)
  .constant('RSAKEY', RSAKEY)
  .config(config)
  .config(routerConfig)
  .config(httpProvider)
  //.run(runBlock)
  .service('main', MainService)
  .service('city', CityService)
  .service('auth', AuthService)
  .service('role', RoleService)
  .service('user', UserService)
  .service('proxy', ProxyService)
  .service('profit', ProfitService)
  .service('deploy', DeployService)
  .service('apply', ApplyService)
  .service('profile', ProfileService)
  .service('sidebarGroup', SidebarGroupService)
  .controller('MainController', MainController)
  .controller('ProxyController', ProxyController)
  .controller('ProxyViewController', ProxyViewController)
  .controller('ProfitController', ProfitController)
  .controller('ProfitViewController', ProfitViewController)
  .controller('DeployController', DeployController)
  .controller('DeployViewController', DeployViewController)
  .controller('ApplyController', ApplyController)
  .controller('ApplyViewController', ApplyViewController)
  .controller('RoleController', RoleController)
  .controller('RoleViewController', RoleViewController)
  .controller('UserController', UserController)
  .controller('UserViewController', UserViewController)
  .controller('ModalProfitController', ModalProfitController)
  .controller('ModalApplyController', ModalApplyController)
  .controller('ProfileViewController', ProfileViewController)
  .controller('ModalConfirmController', ModalConfirmController)
  .component('modalComponent', {
    templateUrl: 'app/profit/modal/modal_profit.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: 'ModalProfitController'
  })
  .component('modalComponentApply', {
    templateUrl: 'app/apply/modal/modal_apply.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: 'ModalApplyController'
  })
  .component('modalComponentConfirm', {
    templateUrl: 'app/components/modal/modal_confirm.html',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    controller: 'ModalConfirmController'
  });


