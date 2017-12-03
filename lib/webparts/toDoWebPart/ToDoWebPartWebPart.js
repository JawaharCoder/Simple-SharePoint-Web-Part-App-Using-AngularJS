"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_client_preview_1 = require('@microsoft/sp-client-preview');
var sp_module_loader_1 = require('@microsoft/sp-module-loader');
var ToDoWebPart_module_scss_1 = require('./ToDoWebPart.module.scss');
var strings = require('toDoStrings');
var angular = require('angular');
require('./app/app-module');
var ToDoWebPartWebPart = (function (_super) {
    __extends(ToDoWebPartWebPart, _super);
    function ToDoWebPartWebPart(context) {
        _super.call(this, context);
        sp_module_loader_1.default.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
        sp_module_loader_1.default.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
    }
    ToDoWebPartWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = "\n<div class=\"" + ToDoWebPart_module_scss_1.default.toDoWebPart + "\">\n  <div data-ng-controller=\"HomeController as vm\">\n    <div class=\"" + ToDoWebPart_module_scss_1.default.configurationNeeded + "\" ng-show=\"vm.configurationNeeded\">\n      Please configure the Web Part\n    </div>\n    <div ng-show=\"vm.configurationNeeded === false\">\n      <div class=\"" + ToDoWebPart_module_scss_1.default.loading + "\" ng-show=\"vm.isLoading\">\n        <uif-spinner>Loading...</uif-spinner>\n      </div>\n      <div id=\"entryform\" ng-show=\"vm.isLoading === false\">\n        <uif-textfield uif-label=\"New to do:\" uif-underlined ng-model=\"vm.newItem\"\n        ng-keydown=\"vm.todoKeyDown($event)\"></uif-textfield>\n      </div>\n      <uif-list id=\"items\" ng-show=\"vm.isLoading === false\" >\n        <uif-list-item ng-repeat=\"todo in vm.todoCollection\" uif-item=\"todo\" ng-class=\"{'" + ToDoWebPart_module_scss_1.default.done + "': todo.done}\">\n          <uif-list-item-primary-text>{{todo.title}}</uif-list-item-primary-text>\n          <uif-list-item-actions>\n            <uif-list-item-action ng-click=\"vm.completeTodo(todo)\" ng-show=\"todo.done === false\">\n              <uif-icon uif-type=\"check\"></uif-icon>\n            </uif-list-item-action>\n            <uif-list-item-action ng-click=\"vm.undoTodo(todo)\" ng-show=\"todo.done\">\n              <uif-icon uif-type=\"reactivate\"></uif-icon>\n            </uif-list-item-action>\n            <uif-list-item-action ng-click=\"vm.deleteTodo(todo)\">\n              <uif-icon uif-type=\"trash\"></uif-icon>\n            </uif-list-item-action>\n          </uif-list-item-actions>\n        </uif-list-item>\n      </uif-list>\n    </div>\n  </div>\n</div>";
            this.$injector = angular.bootstrap(this.domElement, ['todoapp']);
        }
        this.$injector.get('$rootScope').$broadcast('configurationChanged', {
            sharePointApi: this.properties.sharePointApi,
            todoListName: this.properties.todoListName,
            hideFinishedTasks: this.properties.hideFinishedTasks
        });
    };
    Object.defineProperty(ToDoWebPartWebPart.prototype, "propertyPaneSettings", {
        get: function () {
            return {
                pages: [
                    {
                        header: {
                            description: strings.PropertyPaneDescription
                        },
                        groups: [
                            {
                                groupName: strings.DataGroupName,
                                groupFields: [
                                    sp_client_preview_1.PropertyPaneTextField('sharePointApi', {
                                        label: strings.SharePointApiUrlFieldLabel
                                    }),
                                    sp_client_preview_1.PropertyPaneTextField('todoListName', {
                                        label: strings.ToDoListNameFieldLabel
                                    })
                                ]
                            },
                            {
                                groupName: strings.ViewGroupName,
                                groupFields: [
                                    sp_client_preview_1.PropertyPaneToggle('hideFinishedTasks', {
                                        label: strings.HideFinishedTasksFieldLabel
                                    })
                                ]
                            }
                        ]
                    }
                ]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToDoWebPartWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return ToDoWebPartWebPart;
}(sp_client_preview_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToDoWebPartWebPart;

//# sourceMappingURL=ToDoWebPartWebPart.js.map
