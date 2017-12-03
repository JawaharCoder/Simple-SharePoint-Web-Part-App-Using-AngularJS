"use strict";
var DataService = (function () {
    function DataService($q, $http) {
        this.$q = $q;
        this.$http = $http;
    }
    DataService.prototype.getTodos = function (sharePointApi, todoListName, hideFinishedTasks) {
        var deferred = this.$q.defer();
        /*let url: string =
          `${sharePointApi}web/lists/getbytitle('${todoListName}')/items?$select=Id,Title,Status&$orderby=ID desc`;
    
        if (hideFinishedTasks === true) {
          url += "&$filter=Status ne 'Completed'";
        }
    
        this.$http({
          url: url,
          method: 'GET',
          headers: {
            'Accept': 'application/json;odata=nometadata'
          }
        }).then((result: ng.IHttpPromiseCallbackArg<{ value: ITodoItem[] }>): void => {
          const todos: ITodo[] = [];
          for (let i: number = 0; i < result.data.value.length; i++) {
            const todo: ITodoItem = result.data.value[i];
            todos.push({
              id: todo.Id,
              title: todo.Title,
              done: todo.Status === 'Completed'
            });
          }
          deferred.resolve(todos);
        });*/
        var todos = [];
        todos.push({
            id: 1,
            title: 'Sample',
            done: true
        });
        todos.push({
            id: 2,
            title: 'Share',
            done: false
        });
        todos.push({
            id: 3,
            title: 'Point',
            done: false
        });
        todos.push({
            id: 4,
            title: 'Designs',
            done: false
        });
        todos.push({
            id: 5,
            title: 'Site',
            done: false
        });
        todos.push({
            id: 1,
            title: 'Sample',
            done: true
        });
        deferred.resolve(todos);
        return deferred.promise;
    };
    DataService.prototype.addTodo = function (todo, sharePointApi, todoListName) {
        var _this = this;
        var deferred = this.$q.defer();
        this.$http({
            url: sharePointApi + 'contextinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (digestResult) {
            var requestDigest = digestResult.data.FormDigestValue;
            var body = JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.' +
                        todoListName.charAt(0).toUpperCase() +
                        todoListName.slice(1) + 'ListItem'
                },
                'Title': todo
            });
            _this.$http({
                url: sharePointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items',
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': requestDigest
                },
                data: body
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.prototype.deleteTodo = function (todo, sharePointApi, todoListName) {
        var _this = this;
        var deferred = this.$q.defer();
        this.$http({
            url: sharePointApi + 'contextinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (digestResult) {
            var requestDigest = digestResult.data.FormDigestValue;
            _this.$http({
                url: sharePointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items(' + todo.id + ')',
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'X-RequestDigest': requestDigest,
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'DELETE'
                }
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.prototype.setTodoStatus = function (todo, done, sharePointApi, todoListName) {
        var _this = this;
        var deferred = this.$q.defer();
        this.$http({
            url: sharePointApi + 'contextinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        }).then(function (digestResult) {
            var requestDigest = digestResult.data.FormDigestValue;
            var body = JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.' +
                        todoListName.charAt(0).toUpperCase() +
                        todoListName.slice(1) + 'ListItem'
                },
                'Status': done ? 'Completed' : 'Not started'
            });
            _this.$http({
                url: sharePointApi + 'web/lists/getbytitle(\'' + todoListName + '\')/items(' + todo.id + ')',
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': requestDigest,
                    'IF-MATCH': '*',
                    'X-HTTP-Method': 'MERGE'
                },
                data: body
            }).then(function (result) {
                deferred.resolve();
            });
        });
        return deferred.promise;
    };
    DataService.$inject = ['$q', '$http'];
    return DataService;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataService;

//# sourceMappingURL=DataService.js.map
