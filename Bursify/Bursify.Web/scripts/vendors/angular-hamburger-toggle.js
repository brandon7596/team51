﻿/*!
 * angular-hamburger-toggle - v0.2.0
 * https://github.com/dbtek/angular-hamburger-toggle
 * 2015-04-20
 * İsmail Demirbilek
 * MIT License
 */
!function(){(function(){"use strict";angular.module("ngHamburger",[])}).call(this),function(){"use strict";angular.module("ngHamburger").directive("hamburgerToggle",function(){return{restrict:"E",replace:!0,scope:{state:"="},templateUrl:"views/hamburger-toggle.html",link:function(a,b,c){a.toggleState=function(){return a.state=!a.state}}}})}.call(this),angular.module("ngHamburger").run(["$templateCache",function(a){"use strict";a.put("views/hamburger-toggle.html",'<div class="material-design-hamburger"><button class="material-design-hamburger__icon" ng-click="toggleState()"><span class="material-design-hamburger__layer" ng-class="\'material-design-hamburger__icon--\' + (state ? \'to\' : \'from\') + \'-arrow\'"></span></button></div>')}])}();
