export interface ITodo {
    id: number;
    title: string;
    done: boolean;
}
export interface IDataService {
    getTodos(sharePointApi: string, todoListName: string, hideFinishedTasks: boolean): ng.IPromise<ITodo[]>;
    addTodo(todo: string, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
    deleteTodo(todo: ITodo, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
    setTodoStatus(todo: ITodo, done: boolean, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
}
export default class DataService implements IDataService {
    private $q;
    private $http;
    static $inject: string[];
    constructor($q: ng.IQService, $http: ng.IHttpService);
    getTodos(sharePointApi: string, todoListName: string, hideFinishedTasks: boolean): ng.IPromise<ITodo[]>;
    addTodo(todo: string, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
    deleteTodo(todo: ITodo, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
    setTodoStatus(todo: ITodo, done: boolean, sharePointApi: string, todoListName: string): ng.IPromise<{}>;
}
