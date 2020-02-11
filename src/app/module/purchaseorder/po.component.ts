import { Base } from "~/app/common/base";
import { Component, ViewContainerRef } from "@angular/core";
import { OneUserService } from "~/app/common/one.user.service";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Partner } from "~/app/erpshared/domain/partner";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { PartnerService } from "~/app/erpshared/service/partner.service";
import { PartnerFilter } from "~/app/erpshared/domain/partner.filter";
import { Product } from "~/app/erpshared/domain/product";
import { UnitOfMeasurement } from "~/app/erpshared/domain/unit.of.measurement";

@Component({
    selector: "ns-po",
    moduleId: module.id,
    templateUrl: "./po.html"
})
export class POComponent extends Base {
    date: Date;
    partner: Partner;
    barcodescanner: any;
    products: Product[] = [];
    totalMoney: number = 0;
    totalPoint: number = 0;
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, protected page: Page, private translate: TranslateService, 
        private route: ActivatedRoute, router: Router, private partnerService: PartnerService) { 
        super(userService, storageService, utils, page);
        this.barcodescanner = new BarcodeScanner();
        this.date = new Date();
        this.addPro("Cafe đá", 95000, 1);
        this.addPro("Trà đào", 95000, 1);
        this.addPro("Trà xanh thượng hạng", 95000, 1);
        this.partner = new Partner();
        this.partner.code = "PC-0923123131";
        this.partner.name = "Sơn Vinh";
    }

    checkPartner() {
        this.barcodescanner.scan({
                formats: "QR_CODE",
                cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)

                showFlipCameraButton: true,   // default false
                preferFrontCamera: false,     // default false
                showTorchButton: true,        // default false
                beepOnScan: true,             // Play or Suppress beep on scan (default true)
                torchOn: false,               // launch with the flashlight on (default false)
                closeCallback: () => {
                    console.log("Scanner closed");
                }, // invoked when the scanner was closed (success or abort)

                openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
            }).then((result) => {
                // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
                console.log({
                    title: "Scan result",
                    message: "Format: " + result.format + ",\nValue: " + result.text,
                    okButtonText: "OK"
                });
                let partnerFilter = new PartnerFilter();
                partnerFilter.code = result.text;
                partnerFilter.limit = 1;
                this.partnerService.search(partnerFilter).subscribe(data => {
                    if (this.utils.isArrNull(data.content)) {
                        return;
                    }
                    this.partner = data.content[0];
                }, error => {
                    this.utils.showEToast(this.translate, error);
                });
                this.products = [];
                this.totalMoney = 0;
            }, (errorMessage) => {
                this.utils.showToast(this.translate, errorMessage);
                console.log("No scan. " + errorMessage);
            }
        );
    }

    addProduct() {
        this.barcodescanner.scan({
            formats: "QR_CODE, EAN_13",
            cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
            cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)

            showFlipCameraButton: true,   // default false
            preferFrontCamera: false,     // default false
            showTorchButton: true,        // default false
            beepOnScan: true,             // Play or Suppress beep on scan (default true)
            torchOn: false,               // launch with the flashlight on (default false)
            closeCallback: () => {
                console.log("Scanner closed");
            }, // invoked when the scanner was closed (success or abort)

            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then((result) => {
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            console.log({
                title: "Scan result",
                message: "Format: " + result.format + ",\nValue: " + result.text,
                okButtonText: "OK"
            });
                this.addPro(result.text, 95000, 1);
            }, (errorMessage) => {
                this.utils.showToast(this.translate, errorMessage);
                console.log("No scan. " + errorMessage);
            }
        );
    }

    addPro(name: string, price: number, point: number) {
        let product = new Product();
        product.name = name;
        product.code = "PP-" + (this.products.length + 1);
        let unit = new UnitOfMeasurement();
        unit.name = "Kg";
        product.unit = unit;
        this.products.push(product);
        this.totalMoney = this.utils.plus(this.totalMoney, price);
        this.totalPoint = this.utils.plus(this.totalPoint, point);
    }
}