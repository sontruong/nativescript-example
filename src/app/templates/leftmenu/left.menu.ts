import { Component, ViewChild } from "@angular/core";
import { Base } from "~/app/common/base";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Router } from "@angular/router";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";
import { Page } from "tns-core-modules/ui/page/page";
import { OneUserService } from "~/app/common/one.user.service";

@Component({
    selector: "app-menu",
    templateUrl: "./left.menu.html"
})
export class LeftMenuComponent extends Base {
    
    @ViewChild(RadSideDrawerComponent, { static: false }) 
    public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(protected userService: OneUserService, private router: Router, protected localStorage: LocalStorageService, protected utils: Utils, protected page: Page) {
        super(userService, localStorage, utils, page);
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit() {
        this.drawer = this.page.getViewById('slidedrawer');
    }

    onTap(url: string) {
        this.router.navigate([url]);
        this.drawer.closeDrawer();
    }
}