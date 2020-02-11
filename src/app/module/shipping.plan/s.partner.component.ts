import { Base } from "~/app/common/base";
import * as applicationModule from "tns-core-modules/application";
import { Component, Input } from "@angular/core";
import { OneUserService } from "~/app/common/one.user.service";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";
import { Page, isAndroid } from "tns-core-modules/ui/page/page";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ShippingplanService } from "~/app/erpshared/shippingplan/service/shippingplan.service";
import { OneSolConfig } from "~/app/config/app.config";
import { RegionAddress, EntityTypeEnum } from "~/app/erpshared/region/region.address";
import { RegionaddressService } from "~/app/erpshared/region/regionaddress.service";
import { RegionAddressFilter } from "~/app/erpshared/region/region.address.filter";
declare var android;

@Component({
    selector: "ns-shippingplan-partner",
    moduleId: module.id,
    templateUrl: "./spartner.component.html"
})
export class SPartnerComponent extends Base {

    obj: any;
    addrs: string[] = [];
    addresses: RegionAddress[];
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, protected page: Page, private translate: TranslateService, private route: ActivatedRoute, 
        private service: ShippingplanService, private regionAddressService: RegionaddressService, private router: Router) { 
        super(userService, storageService, utils, page);
    }

    ngAfterViewInit() {
        let addFilter = new RegionAddressFilter();
        addFilter.entityType = EntityTypeEnum.PARTNER;
        addFilter.limit = 3;
        addFilter.entityId = this.obj.partner.id;
        this.regionAddressService.search(addFilter).subscribe(data => {
            this.addresses = data.content;
            if (this.utils.isArrNull(this.addresses)) {
                return;
            }
            for (let obj of this.addresses) {
                this.addrs.push(obj.fullAddress);
            }
        });
    }

    ngAfterContentChecked() {
        this.obj = this.storageService.get(OneSolConfig.pDetail);
    }

    ngOnDestroy() {
        this.storageService.save(OneSolConfig.pDetail, undefined);
        this.localStorge.save(OneSolConfig.pAddress, undefined);
    }

    addnew() {

    }

    openmap() {
        this.localStorge.save(OneSolConfig.pAddress, this.addresses);
        this.router.navigate(['/pages/heremap']);
        
        // if (isAndroid) {
        //     // Create a Uri from an intent string. Use the result to create an Intent.
        //     //location
        //     // let gmmIntentUri = android.net.Uri.parse("google.streetview:cbll=46.414382,10.013988");
        //     // address
        //     let address = "geo:0,0?q=1600 Amphitheatre Parkway, Mountain+View, California";
        //     if (this.utils.isArrNNull(this.addrs)) {
        //         address = this.addrs[0];
        //     }
        //     let gmmIntentUri = android.net.Uri.parse("geo:0,0?q=" + address);
            
        //     // Create an Intent from gmmIntentUri. Set the action to ACTION_VIEW
        //     let mapIntent = new android.content.Intent(android.content.Intent.ACTION_VIEW, gmmIntentUri);
        //     // Make the Intent explicit by setting the Google Maps package
        //     mapIntent.setPackage("com.google.android.apps.maps");

        //     applicationModule.android.foregroundActivity.startActivity(android.content.Intent.createChooser(mapIntent, "Choose an Email client :"));
        // }
    }
}