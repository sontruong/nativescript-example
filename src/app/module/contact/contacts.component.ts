import { Component } from "@angular/core";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import { action } from "tns-core-modules/ui/dialogs";
import * as permissions from "nativescript-permissions";
import * as TNSPhone from 'nativescript-phone';
import { TranslateService } from "@ngx-translate/core";

import * as applicationModule from "tns-core-modules/application";
import { OnTabPressedEventData, OnTabSelectedEventData } from 'nativescript-bottom-navigation';

import { Base } from "../../common/base";
import { LocalStorageService } from "../../common/local-storage.service";
import { Utils } from "../../common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { EmployeeService } from "~/app/erpshared/service/employee.service";
import { Employee } from "~/app/erpshared/domain/employee";
import { OneSolConfig } from "~/app/config/app.config";
import { OneUserService } from "~/app/common/one.user.service";
declare var android: any;

@Component({
    selector: "ns-contacts",
    moduleId: module.id,
    templateUrl: "./contacts.component.html"
})
export class ContactsComponent extends Base {
    items: Array<Employee>;
    employeeFilter = new Employee();
    searchString: string;

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(protected oneUserService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils,private employeeService: EmployeeService, 
        protected page: Page, private translate: TranslateService) { 
        super(oneUserService, storageService, utils, page);
        this.employeeFilter.limit = OneSolConfig.maxResult;
    }

    ngAfterViewInit(): void {
        this.employeeService.findContact(this.employeeFilter).subscribe(data => {
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

    call(item: Employee) {
        if (this.utils.isNull(item) || this.utils.isNull(item.phone)) {
            return;
        }
        if (isAndroid) {
            permissions.requestPermission(android.Manifest.permission.CALL_PHONE, "App Needs This Permission To Make Phone Calls")
            .then(()=>{
                if (permissions.hasPermission(android.Manifest.permission.CALL_PHONE)) {
                    console.log("Got Permission! Start calling" + item.phone);
                    TNSPhone.dial(String(item.phone), false);
                } else {
                    this.utils.showToast(this.translate, "Didn't get Permission!");
                }
            }).catch(()=>{
                this.utils.showToast(this.translate, "Permission Denied!");
            });
        }
        if (isIOS) {
            
        }
        
    }

    onLongPress(item: Employee) {
        action({
            actions: ["Send email", "Call mobile"]
        }).then((result) => {
            if (result == "Call mobile") {
                this.call(item);
            } else {
                this.callActivity(item);
            }
        });
    }

    callActivity(item: Employee) {
        if (this.utils.isNull(item) || this.utils.isNull(item.email)) {
            return;
        }
        if (isAndroid) {
            let intent = new android.content.Intent(android.content.Intent.ACTION_SEND);
            //need this to prompts email client only  
            intent.setType("message/rfc822");  
            intent.putExtra(android.content.Intent.EXTRA_EMAIL, item.email);
            applicationModule.android.foregroundActivity.startActivity(android.content.Intent.createChooser(intent, "Choose an Email client :"));
        }
    }

    onBottomNavigationTabPressed(args: OnTabPressedEventData): void {
        console.log(`Tab pressed:  ${args.index}`);
        
    }

    onBottomNavigationTabSelected(args: OnTabSelectedEventData): void {
        console.log(`Tab selected:  ${args.oldIndex}`);
      }
    
}
