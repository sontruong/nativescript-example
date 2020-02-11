import { Component } from "@angular/core";

import { ToDo } from "./todo";
import { TodoService } from "./todo.service";
import { Base } from "../../common/base";
import { LocalStorageService } from "../../common/local-storage.service";
import { Utils } from "../../common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { OneUserService } from "~/app/common/one.user.service";

@Component({
    selector: "ns-todos",
    moduleId: module.id,
    templateUrl: "./todos.component.html"
})
export class TodosComponent extends Base {
    items: Array<ToDo>;

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils,private itemService: TodoService, protected page: Page) { 
        super(userService, storageService, utils, page);
    }

    ngAfterViewInit(): void {
        this.items = this.itemService.getItems();
    }
}
