import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { Page } from "tns-core-modules/ui/page/page";
import { OneUserService } from "~/app/common/one.user.service";
import { Base } from "~/app/common/base";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";

@Component({
    selector: "ns-notice",
    moduleId: module.id,
    templateUrl: "./notice.component.html"
})
export class NoticeComponent extends Base {
    item: Item;

    constructor(protected oneUserService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, private itemService: ItemService, private route: ActivatedRoute, protected page: Page) { 
        super(oneUserService, storageService, utils, page)
    }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.item = this.itemService.getItem(id);
        this.page.actionBarHidden = true;
    }
}
