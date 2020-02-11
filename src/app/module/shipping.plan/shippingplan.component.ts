import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { confirm } from "tns-core-modules/ui/dialogs";

import { Base } from "../../common/base";
import { LocalStorageService } from "../../common/local-storage.service";
import { Utils } from "../../common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { ShippingPlan, ShippingStatus } from "~/app/erpshared/shippingplan/model/shipping.plan";
import { ShippingplanService } from "~/app/erpshared/shippingplan/service/shippingplan.service";
import { ActivatedRoute, Router } from "@angular/router";
import { OneUserService } from "~/app/common/one.user.service";
import { OnTabSelectedEventData } from "nativescript-bottom-navigation/bottom-navigation.common";
import { ShippingPlanAdditionalProductFilter } from "~/app/erpshared/shippingplan/model/shipping.plan.additional.product.filter";
import { ShippingplanadditionalproductService } from "~/app/erpshared/shippingplan/service/shippingplanadditionalproduct.service";
import { ShippingPlanFeeDetail } from "~/app/erpshared/shippingplan/model/shipping.plan.fee.detail";
import { ShippingplanfeedetailService } from "~/app/erpshared/shippingplan/service/shippingplanfeedetail.service";
import { ShippingPlanFeeDetailFilter } from "~/app/erpshared/shippingplan/model/shipping.plan.fee.detail.filter";
import { OneSolConfig } from "~/app/config/app.config";
import { PartnerLiabilityFilter } from "~/app/erpshared/liability/partner.liability.filter";
import { PartnerliabilityService } from "~/app/erpshared/liability/partnerliability.service";


@Component({
    selector: "ns-shippingplan",
    moduleId: module.id,
    templateUrl: "./shippingplan.component.html"
})
export class ShippingplanComponent extends Base {
    item: ShippingPlan;
    tabActive: number = 0;
    shippingproducts: any[];
    showVehicles: boolean = false;
    fees: ShippingPlanFeeDetail[];
    objPartners: any[] = [];
    constructor(protected userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils,  protected router: Router,
        protected page: Page, private translate: TranslateService, private route: ActivatedRoute, private service: ShippingplanService, 
        private shippingAdditionalService: ShippingplanadditionalproductService, private feeDetailService: ShippingplanfeedetailService, private liabilityService: PartnerliabilityService) { 
        super(userService, storageService, utils, page);
    }

    ngAfterViewInit(): void {
        const id =+ this.route.snapshot.params.id;
        this.service.getObj(id).subscribe(data => {
            this.item = data;
            this.calculateData();
        }, error => {
            this.utils.showEToast(this.translate, error);
        });
    }

    private calculateData() {
        let filter = new ShippingPlanAdditionalProductFilter();
        filter.shippingPlanId = [this.item.id];
        filter.limit = OneSolConfig.maxResult;
        this.shippingAdditionalService.search(filter).subscribe(data => {
            this.shippingproducts = this.service.calculatingProductList(this.item, data.content);;
        });

        let feeFilter = new ShippingPlanFeeDetailFilter();
        feeFilter.limit = OneSolConfig.maxResult;
        feeFilter.shippingPlanId = this.item.id;
        this.feeDetailService.search(feeFilter).subscribe(data => {
            this.fees = data.content;
        });

        this.calculateProgress();
    }

    onBottomNavigationTabSelected(event: OnTabSelectedEventData): void {
        this.tabActive = event.newIndex;
        console.log(`Tab selected:  ${event.newIndex}`);
    }

    onTapVehicle() {
        this.showVehicles = !this.showVehicles;
        console.log('-----' + this.showVehicles);
    }

    public canWaiting_goods(): boolean {
        if (this.utils.isNNull(this.item) && this.item.status === ShippingStatus.PENDING && this.checkAuthorityKey('sys.func.ShippingPlan.waiting_goods')) {
            return true;
        }
        return false;
      }
    
      public openWaiting_goods() {
        let options = {
            title: "Confirm reserved",
            message: "Are you sure you want reserve all products?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };
        
        confirm(options).then((result: boolean) => {
            if (result) {
                this.service.waiting_goodsAction(this.item.id);
            }
        });
      }

    
      public canStarted(): boolean {
        if (this.utils.isNNull(this.item) && this.item.status === ShippingStatus.PREPARED && this.checkAuthorityKey('sys.func.ShippingPlan.started')) {
            return true;
        }
        return false;
      }
    
      public openStarted() {
        let options = {
            title: "Confirm start",
            message: "Are you sure you want start this plan?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };
        
        confirm(options).then((result: boolean) => {
            if (result) {
                this.service.startedAction(this.item.id, null).subscribe();
            }
        });
      }
    
      public canReturning(): boolean {
        if (this.utils.isNNull(this.item) && this.item.status === ShippingStatus.STARTED && this.checkAuthorityKey('sys.func.ShippingPlan.returning')) {
            return true;
        }
        return false;
      }
    
      public openReturning() {
        // this.dialogService.open(OneNoteComponent,{
        //   context: {
        //     title: 'tranquangerp.title.returning.reason',
        //   }, }).onClose.subscribe(note => note && this.returning(note));
      }
    
      public returning(note: string) {
        // this.spinner.show();
        // let dto = new OneNote();
        // dto.note = note;
        // this.itemService.returningAction(this.item.id, dto).subscribe(() => {
        //     this.showSToast(this.toaster, this.translate, 'tranquangerp.title.shippingplan.returning.success', null, null);
        //     this.ngOnInit();
        //     this.spinner.hide();
        //   }, error => {
        //     this.spinner.hide();
        //     this.showE2Toast(this.toaster, this.translate, error);
        //   });
      }
    

      public canReturned(): boolean {
        if (this.utils.isNNull(this.item) && this.item.status === ShippingStatus.RETURNING && this.checkAuthorityKey('sys.func.ShippingPlan.returned')) {
            return true;
        }
        return false;
      }
    
      public openReturned() {
        let options = {
            title: "Confirm returned",
            message: "Are you sure you want confirm you returned to company?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };
        
        confirm(options).then((result: boolean) => {
            if (result) {
                console.log('----------- yes');
            }
        });
      }

      addFee() {

      }

    orderPay: number;
    liabilityPay: number;
    saleAmount: number;
    receiveAmount: number;

    calculateProgress() {
        this.orderPay = 0;
        this.liabilityPay = 0;
        let liabilityFilter = new PartnerLiabilityFilter();
        liabilityFilter.limit = OneSolConfig.maxResult;
        liabilityFilter.channelId = this.item.channelId;
        this.liabilityService.search(liabilityFilter).subscribe(data => {
            let liabilities = data.content;
            if (this.utils.isArrNull(liabilities)) {
                liabilities = [];
            }
            this.objPartners = this.service.calculatingProgress(this.item, liabilities);
            for (let i in this.objPartners) {
                let detail = this.objPartners[i];
                if (this.utils.isNull(detail.saleAmount1)) {
                    detail.saleAmount1 = detail.saleAmount;
                }

                if (this.utils.isNull(detail.receiveAmount1)) {
                    detail.receiveAmount1 = detail.receiveAmount;
                }
            }
        });
        // this.broughtProducts = this.shippingplanService.calculatingProductList(this.shipping, this.additionalProducts);
        // for (let i in this.broughtProducts) {
        //     let detail = this.broughtProducts[i];
        //     this.products.push(detail.product);
        // }
    }

    select(item: any){
        this.storageService.save(OneSolConfig.pDetail, item);
        this.router.navigate(['/pages/shippingplan/partner/detail'])
    }
}


export class Person {
    public name: string;
    public age: number;
    public email: string;
    public city: string;
    public street: string;
    public streetNumber: number;

    constructor(name, age, email, city, street, streetNumber) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }
}