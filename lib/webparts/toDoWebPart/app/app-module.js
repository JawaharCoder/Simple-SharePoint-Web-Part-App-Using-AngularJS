"use strict";
var angular = require('angular');
var HomeController_1 = require('./HomeController');
var DataService_1 = require('./DataService');
require('ng-office-ui-fabric');
var todoapp = angular.module('todoapp', [
    'officeuifabric.core',
    'officeuifabric.components'
]);
todoapp
    .controller('HomeController', HomeController_1.default)
    .service('DataService', DataService_1.default);

//# sourceMappingURL=app-module.js.map
