import {InjectionToken} from '@angular/core';

export let rootService: string = "http://oonesolution.com:8080/erp-appsvc/";
export let URL_LOGIN: string = "login";




export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export let TOAST_MESSAGE_TIMEOUT = 3000;
export let COUNTRY_CODE = 'en';
export class AppConfig {

}

export const OneSolConfig = {
  sso: false,
  hasCreateAccount: false,
  lstorageUsrName: 'userInfo',
  pDetail: 'pDetail',
  pAddress: 'pAddress',
  loginToken: 'Basic d2FycmFudHk6d2FycmFudHlzZWNyZXQ=',
  loginType: 'application/x-www-form-urlencoded',
  maxResult: 1000
}