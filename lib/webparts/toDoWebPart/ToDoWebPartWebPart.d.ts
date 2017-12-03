import { BaseClientSideWebPart, IPropertyPaneSettings, IWebPartContext } from '@microsoft/sp-client-preview';
import { IToDoWebPartWebPartProps } from './IToDoWebPartWebPartProps';
import './app/app-module';
export default class ToDoWebPartWebPart extends BaseClientSideWebPart<IToDoWebPartWebPartProps> {
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected propertyPaneSettings: IPropertyPaneSettings;
    protected disableReactivePropertyChanges: boolean;
}
