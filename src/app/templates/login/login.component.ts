import { Component, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { OneUserService } from "../../common/one.user.service";
import { Base } from "~/app/common/base";
import { LocalStorageService } from "~/app/common/local-storage.service";
import { Utils } from "~/app/common/Utils";
import { Router } from "@angular/router";

import {OneSolConfig} from '../../config/app.config';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends Base {
    isLoggingIn = true;
    processing = false;
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    username: string;
    pass: string;
    confirmPass: string;
    config = OneSolConfig;
    constructor(private userService: OneUserService, protected storageService: LocalStorageService, protected utils: Utils, 
        private translate: TranslateService, protected page: Page, private router: Router) {
        super(userService, storageService, utils, page);
        this.page.actionBarHidden = true;
        this.username = 'one.superadmin';
        this.pass = 'string';
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (this.utils.isEmpty(this.username) || this.utils.isEmpty(this.pass)) {
            this.utils.showToast(this.translate, "Please provide both an username and password.")
            return;
        }
        this.processing = true;
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.userService.login(this.username, this.pass).subscribe(data => {
            this.processing = false;
            var token: any = data._body;
            this.storageService.save('access_token', token.token_type + ' ' + token.access_token);
            this.storageService.save('refresh_token', token.token_type + ' ' + token.refresh_token);
            this.userService.getLogginUser().subscribe(data => {
              this.appUser = data;
              this.storageService.save(OneSolConfig.lstorageUsrName, this.appUser);
              this.router.navigate(['pages/notices']);
            }, error => {
                this.utils.showEToast(this.translate, error)
            });
        }, error => {
            this.processing = false;
            this.utils.showEToast(this.translate, error)
        });
    }

    register() {
      
    }

    forgotPassword() {

    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }
}

