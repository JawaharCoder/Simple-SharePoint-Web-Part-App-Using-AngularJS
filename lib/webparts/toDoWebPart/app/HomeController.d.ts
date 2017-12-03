import { IDataService, ITodo } from './DataService';
export default class HomeController {
    private dataService;
    private $window;
    private $rootScope;
    static $inject: string[];
    isLoading: boolean;
    newItem: string;
    todoCollection: any[];
    private sharePointApi;
    private todoListName;
    private hideFinishedTasks;
    private configurationNeeded;
    constructor(dataService: IDataService, $window: ng.IWindowService, $rootScope: ng.IRootScopeService);
    todoKeyDown($event: any): void;
    deleteTodo(todo: ITodo): void;
    completeTodo(todo: ITodo): void;
    undoTodo(todo: ITodo): void;
    private init(sharePointApi, todoListName, hideFinishedTasks?);
    private loadTodos();
}
