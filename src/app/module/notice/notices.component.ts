import { Component } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { Base } from "../../common/base";
import { LocalStorageService } from "../../common/local-storage.service";
import { Utils } from "../../common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { OneUserService } from "~/app/common/one.user.service";

@Component({
    selector: "ns-notices",
    moduleId: module.id,
    templateUrl: "./notices.component.html"
})
export class NoticesComponent extends Base {
    items: Array<Item> = [];

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(protected oneUserService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils,private itemService: ItemService, protected page: Page) { 
        super(oneUserService, storageService, utils, page);
    }

    ngAfterContentChecked() {
        this.items = this.itemService.getItems();
    }
}
