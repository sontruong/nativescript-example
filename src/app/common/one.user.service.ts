import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {Router} from '@angular/router';

import {LocalStorageService} from './local-storage.service';
import {HttpRequestService} from './http.request.service';
import {Observable, pipe} from 'rxjs';
import {AppUser, OneFunction} from './objs';
import * as OneConfig from '../config/app.config';
import {map} from 'rxjs/operators';

import { LOGGING_USER, APP_LOGIN, APP_LOGOUT } from '../config/app.api';

@Injectable()
export class OneUserService {

  constructor(private http: HttpRequestService, private router: Router,
    public storageService: LocalStorageService) {
  }

  public getLogginUser(): Observable<AppUser> {
    const user: Observable<AppUser> = this.http.get(LOGGING_USER.apiEndpoint).pipe(map((res: Response) => res.json()));
    return user;
  }

  public checkRoles(key: string, user: AppUser): boolean {
    if (user !== undefined && user !== null && user.roles !== undefined && user.roles.length > 0) {
      for (const obj in user.roles) {
        if (user.roles[obj].toUpperCase() === key.toUpperCase()) {
          return true;
        }
      }
    }
    return false;
  }

  public checkAuthority(key: string, method: string, user: AppUser): boolean {
    if (user !== undefined && user !== null && user.roles !== undefined && user.roles.length > 0) {
      for (const obj in user.apiFunctions) {
        const func: any = user.apiFunctions[obj];
        if (func.allowAll ||
          (func.api === key && func.method === method)) {
          return true;
        }
      }
    }
    return false;
  }

  public checkAuthorityKey(key: string, user: AppUser): boolean {
    if (undefined === user || null === user || user.apiFunctions === undefined ||
                      user.apiFunctions === null || user.apiFunctions.length === 0) {
      return false;
    }
    for (const obj in user.apiFunctions) {
      const func: any = user.apiFunctions[obj];
      if (func.allowAll || func.functionKey === key) {
        return true;
      }
    }
    return false;
  }

  public checkAuthorityMenuKey(key: string, user: AppUser): boolean {
    if (undefined === user || null === user) {
      return false;
    }
    if (user.menuFunctions === undefined || user.menuFunctions.length === 0) {
      return false;
    }
    for (const obj in user.menuFunctions) {
      const func: any = user.menuFunctions[obj];
      if (func.allowAll || func.functionKey === key) {
        return true;
      }
      if (null != func.childrenFunction && 0 < func.childrenFunction.length){
        if (true === this.checkChildMenu(user.menuFunctions, key)){
          return true;
        }
      }
    }
    return false;
  }

  private checkChildMenu(functions: OneFunction[], key: string): boolean {
    if (functions === undefined || functions.length === 0) {
      return false;
    }
    for (const obj in functions) {
      const func: any = functions[obj];
      if (func.allowAll || func.functionKey === key) {
        return true;
      }
      if (true === this.checkChildMenu(func.childrenFunction, key)){
        return true;
      }
    }
    return false;
  }

  public login(username: string, pass: string): Observable<any> {
    const options: RequestOptionsArgs = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('authorization', OneConfig.OneSolConfig.loginToken);
    options.headers.append('content-Type', OneConfig.OneSolConfig.loginType);
    const token: Observable<any> = this.http.post(APP_LOGIN.apiEndpoint, 'grant_type=password&username=' + username + '&password=' + pass + '', options);
      pipe(map((res: Response) => res.json()));
    return token;
  }

  public logout(loginUrl: string): void {
    this.http.get(APP_LOGOUT.apiEndpoint).subscribe(data => {
      console.log('logout success');
    }, error => {
      console.log('logout error'); 
    });
    this.storageService.save('userInfo', '');
    this.storageService.save('access_token', '');
    this.storageService.save('refresh_token', '');
    this.router.navigateByUrl('/' + loginUrl);
  }
}
