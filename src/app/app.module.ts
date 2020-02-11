import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativescriptBottomNavigationModule} from "nativescript-bottom-navigation/angular";
import {NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { HttpRequestService } from "./common/http.request.service";
import { XHRBackend, RequestOptions } from "@angular/http";
import { registerElement } from "nativescript-angular/element-registry";

import * as mobileLocalStorage from 'nativescript-localstorage';
import { I18NModule } from "./common/i18n/i18n.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LocalStorageService } from "./common/local-storage.service";
import { OneUserService } from "./common/one.user.service";

import { HeremapComponent } from "./templates/heremap";
import { LoginComponent } from "./templates/login/login.component";
import { LeftMenuComponent } from "./templates/leftmenu/left.menu";
import { HomeComponent } from "./home/home.component";
import { NoticeComponent } from "./module/notice/notice.component";
import { NoticesComponent } from "./module/notice/notices.component";
import { TodoComponent } from "./module/todolist/todo.component";
import { TodosComponent } from "./module/todolist/todos.component";
import { ContactsComponent } from "./module/contact/contacts.component";
import { ShippingplansComponent } from "./module/shipping.plan/shippingplans.component";
import { ShippingplanComponent } from "./module/shipping.plan/shippingplan.component";
import { SPartnerComponent } from "./module/shipping.plan/s.partner.component";
import { POComponent } from "./module/purchaseorder/po.component";

import { BarcodeScanner } from "nativescript-barcodescanner";
import { ScannerComponent } from "./templates/scanner.component";

registerElement("HereMap", () => require("nativescript-here").Here);
registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,

        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptUIDataFormModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule,
        NativescriptBottomNavigationModule,
        I18NModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HeremapComponent,
        HomeComponent,
        LeftMenuComponent,
        NoticesComponent,
        NoticeComponent, 
        TodoComponent,
        TodosComponent,
        ContactsComponent,
        ShippingplansComponent,
        ShippingplanComponent,
        SPartnerComponent,
        POComponent,
        ScannerComponent,
    ],
    entryComponents: [ScannerComponent],
    providers: [
        {
            provide: HttpRequestService,
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router) => {
              return new HttpRequestService(xhrBackend, requestOptions, router);
            },
            deps: [XHRBackend, RequestOptions, Router]
        },
        {
            provide: mobileLocalStorage,
            useValue: localStorage
        },
        LocalStorageService,
        OneUserService,
        BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
