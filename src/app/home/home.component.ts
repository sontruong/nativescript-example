import { Component, ViewChild } from "@angular/core";
import { Base } from "../common/base";
import { OneUserService } from "../common/one.user.service";
import { LocalStorageService } from "../common/local-storage.service";
import { Utils } from "../common/Utils";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as firebase from 'nativescript-plugin-firebase';
import { Page } from "tns-core-modules/ui/page/page";
import { OneSolConfig } from "../config/app.config";

@Component({
    selector: "app-root",
    moduleId: module.id,
    templateUrl: "./home.component.html",
})
export class HomeComponent extends Base { 
    
    @ViewChild(RadSideDrawerComponent, { static: false }) 
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(private userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, 
        private translate: TranslateService, private router: Router, protected page: Page) {
        super(userService, storageService, utils, null);
    }

    ngOnInit() {
        this.appUser = this.localStorge.get(OneSolConfig.lstorageUsrName);
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        firebase.init({showNotifications: true, 
                showNotificationsWhenInForeground: true,
                onPushTokenReceivedCallback: (token) => {
                    console.log('[Firebase] onPushTokenReceivedCallback:', { token });
                },
                onMessageReceivedCallback: (message: firebase.Message) => {
                    console.log('[Firebase] onMessageReceivedCallback:', { message });
                }
            }).then(() => {
              console.log('[Firebase] Initialized');
            }) .catch(error => {
              console.log('[Firebase] Initialize', { error });
            });
    }

    logout() {
        this.userService.logout("login");
    }

    public openTabDrawer() {
        if (this.utils.isNull(this.drawer)) {
            return;
        }
        if (this.drawer.getIsOpen()) {
            this.drawer.closeDrawer();
            return;
        }
        this.drawer.showDrawer();
    }
}