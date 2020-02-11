import { OnInit, AfterViewInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { AppUser } from './objs';
import { LocalStorageService } from './local-storage.service';
import { Utils } from './Utils';
import { OneSolConfig } from '../config/app.config';
import { Page } from 'tns-core-modules/ui/page/page';
import { OneUserService } from './one.user.service';

export class Base implements OnInit, AfterViewInit, AfterContentChecked, OnDestroy {
  
    public appUser: AppUser;
    constructor(protected oneUserService: OneUserService, protected localStorge: LocalStorageService, protected utils: Utils, protected page: Page) {

    }

    ngOnInit(): void {
        if (this.utils.isNNull(this.page)) {
            this.page.actionBarHidden = true;
        }
        this.appUser = this.localStorge.get(OneSolConfig.lstorageUsrName);
        if (this.utils.isNull(this.appUser)) {
          this.oneUserService.getLogginUser().subscribe(data => {
            this.appUser = data;
            this.localStorge.save(OneSolConfig.lstorageUsrName, data);
          });
        }
    }

    ngAfterViewInit(): void {
        //tbd
    }

    ngAfterContentChecked() {

    }

    ngOnDestroy(): void {
      
    }
    public checkRoles(key: string): boolean {
      return this.oneUserService.checkRoles(key, this.appUser);
    }
  
    public checkAuthority(api: string, method: string): boolean {
      return this.oneUserService.checkAuthority(api, method, this.appUser);
    }
    
    public checkAuthorityKey(key: string): boolean {
      return this.oneUserService.checkAuthorityKey(key, this.appUser);
    }
  
    public checkAuthorityMenuKey(key: string): boolean {
      return this.oneUserService.checkAuthorityMenuKey(key, this.appUser);
    }
    
}