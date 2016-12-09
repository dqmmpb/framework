/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { SidebarGroupService } from '../app/components/sidebarGroup/sidebarGroup.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { CityService } from '../app/components/city/city.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { SidebarDirective } from '../app/components/sidebar/sidebar.directive';
import { BreadcrumbDirective } from '../app/components/breadcrumb/breadcrumb.directive';
import { ToolsDirective } from '../app/components/tools/tools.directive';

angular.module('ui.framework',[ 'ui.framework.navbar', 'ui.framework.sidebar', 'ui.framework.breadcrumb', 'ui.framework.tools']);

angular.module('ui.framework.navbar', [])
  .directive('uibNavbar', NavbarDirective);

angular.module('ui.framework.sidebar', [])
  .directive('uibSidebar', SidebarDirective);

angular.module('ui.framework.breadcrumb', [])
  .directive('uibBreadcrumb', BreadcrumbDirective);

angular.module('ui.framework.tools', [])
  .directive('uibTools', ToolsDirective);

angular.module('framework', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr', 'ui.framework'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .service('city', CityService)
  .service('sidebarGroup', SidebarGroupService)
  .controller('MainController', MainController);

