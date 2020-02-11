import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

import { Base } from "../../common/base";
import { LocalStorageService } from "../../common/local-storage.service";
import { Utils } from "../../common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { OneSolConfig } from "~/app/config/app.config";
import { ShippingPlan, ShippingStatus } from "~/app/erpshared/shippingplan/model/shipping.plan";
import { ShippingplanService } from "~/app/erpshared/shippingplan/service/shippingplan.service";
import { ShippingPlanFilter } from "~/app/erpshared/shippingplan/model/shipping.plan.filter";
import { OneUserService } from "~/app/common/one.user.service";


@Component({
    selector: "ns-shippingplans",
    moduleId: module.id,
    templateUrl: "./shippingplans.component.html"
})
export class ShippingplansComponent extends Base {
    items: Array<ShippingPlan>;
    filter = new ShippingPlanFilter();
    searchString: string;

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, 
        private service: ShippingplanService, protected page: Page, private translate: TranslateService) { 
        super(userService, storageService, utils, page);
        this.filter.limit = OneSolConfig.maxResult;
        this.filter.status = [ShippingStatus.PENDING, ShippingStatus.PREPARED, ShippingStatus.RETURNED, ShippingStatus.RETURNING, ShippingStatus.STARTED];
        let dateF = new Date();
        dateF = this.utils.addDays(dateF, -5);
        let dateT = new Date();
        dateT = this.utils.addDays(dateT, 2);
        this.filter.startDateFrom = this.utils.parseJVDate(dateF);
        this.filter.startDateTo = this.utils.parseJVDate(dateT);
    }

    ngAfterViewInit(): void {
        this.service.search(this.filter).subscribe(data => {
            this.items = data.content;
        }, error => {
            this.utils.showEToast(this.translate, error);
        });
    }

    onSearch(event: any) {
        console.log("[onSearch]" + event);
    }

    onSubmitSearch(event: any) {
        console.log("[event]" + event);
    }
}
