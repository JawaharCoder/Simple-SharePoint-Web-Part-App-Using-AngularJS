"use strict";
var HomeController = (function () {
    function HomeController(dataService, $window, $rootScope) {
        this.dataService = dataService;
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.isLoading = false;
        this.newItem = undefined;
        this.todoCollection = [];
        this.sharePointApi = undefined;
        this.todoListName = undefined;
        this.hideFinishedTasks = false;
        this.configurationNeeded = true;
        var vm = this;
        this.init(undefined, undefined);
        $rootScope.$on('configurationChanged', function (event, args) {
            vm.init(args.sharePointApi, args.todoListName, args.hideFinishedTasks);
        });
    }
    HomeController.prototype.todoKeyDown = function ($event) {
        var _this = this;
        if ($event.keyCode === 13 && this.newItem.length > 0) {
            $event.preventDefault();
            this.todoCollection.unshift({ id: -1, title: this.newItem, done: false });
            var vm_1 = this;
            this.dataService.addTodo(this.newItem, vm_1.sharePointApi, vm_1.todoListName)
                .then(function () {
                _this.newItem = undefined;
                _this.dataService.getTodos(vm_1.sharePointApi, vm_1.todoListName, vm_1.hideFinishedTasks)
                    .then(function (todos) {
                    _this.todoCollection = todos;
                });
            });
        }
    };
    HomeController.prototype.deleteTodo = function (todo) {
        var _this = this;
        if (this.$window.confirm('Are you sure you want to delete this todo item?')) {
            var index = -1;
            for (var i = 0; i < this.todoCollection.length; i++) {
                if (this.todoCollection[i].id === todo.id) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                this.todoCollection.splice(index, 1);
            }
            var vm_2 = this;
            this.dataService.deleteTodo(todo, vm_2.sharePointApi, vm_2.todoListName)
                .then(function () {
                _this.dataService.getTodos(vm_2.sharePointApi, vm_2.todoListName, vm_2.hideFinishedTasks)
                    .then(function (todos) {
                    _this.todoCollection = todos;
                });
            });
        }
    };
    HomeController.prototype.completeTodo = function (todo) {
        var _this = this;
        todo.done = true;
        var vm = this;
        this.dataService.setTodoStatus(todo, true, vm.sharePointApi, vm.todoListName)
            .then(function () {
            _this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
                .then(function (todos) {
                _this.todoCollection = todos;
            });
        });
    };
    HomeController.prototype.undoTodo = function (todo) {
        var _this = this;
        todo.done = false;
        var vm = this;
        this.dataService.setTodoStatus(todo, false, vm.sharePointApi, vm.todoListName)
            .then(function () {
            _this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
                .then(function (todos) {
                _this.todoCollection = todos;
            });
        });
    };
    HomeController.prototype.init = function (sharePointApi, todoListName, hideFinishedTasks) {
        if (sharePointApi !== undefined && sharePointApi.length > 0 &&
            todoListName !== undefined && todoListName.length > 0) {
            this.sharePointApi = sharePointApi;
            this.todoListName = todoListName;
            this.hideFinishedTasks = hideFinishedTasks;
            this.loadTodos();
            this.configurationNeeded = false;
        }
        else {
            this.configurationNeeded = true;
        }
    };
    HomeController.prototype.loadTodos = function () {
        var vm = this;
        this.isLoading = true;
        this.dataService.getTodos(vm.sharePointApi, vm.todoListName, vm.hideFinishedTasks)
            .then(function (todos) {
            vm.todoCollection = todos;
        })
            .finally(function () {
            vm.isLoading = false;
        });
    };
    HomeController.$inject = ['DataService', '$window', '$rootScope'];
    return HomeController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeController;

//# sourceMappingURL=HomeController.js.map
