import {Injectable} from '@angular/core';
import {Headers, Response} from '@angular/http';
import { UUID } from 'angular2-uuid';
var Toast = require("nativescript-toast");
import { TranslateService } from '@ngx-translate/core';

import {OnesMessage, OnesSort} from './objs';
import * as AppConfig from '../config/app.config';


@Injectable()
export class Utils {
  
  public isTrue(b: boolean) {
    if (this.isNull(b)) {
      return false;
    }
    return b;
  }
  
  public isValid(obj: any): boolean {
    return obj !== null && obj !== undefined;
  }

  public handleError(error: any, alerts: Array<Object>): Array<Object> {
    const message: OnesMessage = new OnesMessage();
    message.type = 'danger';
    alerts = [];
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message.code = body.code;
      message.message = body.message;
      if (message.message === null || undefined === message.message) {
        message.message = message.code;
      }
      message.violations = body.violations;
      if (401 === error.status && AppConfig.OneSolConfig.sso) {
        window.location.href = AppConfig.rootService + body.message;
      } else if (0 === error.status) {
        message.message = 'Cannot connect to server';
      }
    } else if (error + '' === 'SyntaxError: Unexpected end of JSON input') {
      return alerts;
    }
    alerts.push({msg: message.message, type: message.type, closable: true, violations: message.violations});
    return alerts;
  }

  public convertError(error: any): OnesMessage {
    const message: OnesMessage = new OnesMessage();
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message.code = body.code;
      message.message = body.message;
      message.violations = body.violations;
    }
    return message;
  }

  public getJson(res: Response): any {
    try {
      return res.json() 
    } catch {
      return null;
    }
  }

  public handleSuccess(success: OnesMessage, alerts: Array<Object>): Array<Object> {
    const message: OnesMessage = new OnesMessage();
    message.type = 'success';
    message.message = success.code;
    alerts = [];
    alerts.push({msg: message.message, type: message.type, closable: true});
    return alerts;
  }

  public getSorts(sorts: any[]): OnesSort[] {
    const sortDTOs: OnesSort[] = [];

    if (undefined !== sorts && undefined !== sorts[0]) {
      let sortDirection = 'ASC';
      if (sorts[0].sort !== 'asc') {
        sortDirection = 'DESC';
      } else {
        sortDirection = 'ASC';
      }
      let propertyN = sorts[0].colId;
      
      sortDTOs.push({property: propertyN, direction: sortDirection});
    }

    return sortDTOs;
  }

  generateHeader(): Headers {
    const headers = new Headers({'Content-Type': 'application/json'});
    return headers;
  }

  parseDateString(dateStr: string) {
    let date = new Date(dateStr);
    return this.parseJVDate(date);
  }

  parseDate(date: any): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  parseNumberDate(timestamp: any): Date {
    return new Date(timestamp);
  }

  parseNumberToStringDate(timestamp: any): any {
    let date = this.parseNumberDate(timestamp);
    return this.getDateObject(date.getDate(), (date.getMonth() + 1), date.getUTCFullYear());(new Date(timestamp));
  }

  parseTsDate(date: any): any {
    if (date instanceof Date) {
      return date;
    }
    if (null === date || undefined === date) {
      return null;
    }
    const tmp: Date = new Date(date);
    return tmp;
  }

  parseLocalDate(timesheetDate: number[]) {
    let result = new Date(timesheetDate[0], timesheetDate[1]-1, timesheetDate[2]);
    return result;
  }

  createTsDateNow(): any {
    const tmp: Date = new Date();
    const dateModel: any = {
      'year': tmp.getUTCFullYear(),
      'month': tmp.getMonth() + 1,
      'day': tmp.getDate(),
    };
    return this.parseJVDate(tmp);
  }

  public getDate(date: Date, day: number): Date {
    return new Date(date.getUTCFullYear(), date.getMonth(), day);
  }

  getNumOfDay(date1: Date, date2: Date): number {
    var res = Math.abs(date2.getTime() - date1.getTime()) / 1000;
    var days = Math.floor(res / 86400);
    return days;
  }

  getLastDayOfMonth(date: Date): number {
    let tmp = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0);
    return tmp.getDate();
  }

  parseTimestampDate(date: any): any {
    if (null === date || undefined === date) {
      return null;
    }

    const tmp: Date = new Date(this.parseJVDate(date));
    const timestamp = tmp.getTime();
    return timestamp;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  dateAddDays(date: Date, days: number): string {
    date.setDate(date.getDate() + days);
    return this.getDateObject(date.getUTCDate(), date.getUTCMonth(), date.getUTCFullYear());
  }

  parseJVDate(date: any): any {
    if (date instanceof Date) {
      return this.getDateObject(date.getDate(), (date.getMonth() + 1), date.getUTCFullYear());
    }
    if (null === date || undefined === date) {
      return null;
    }
    if (date.day < 0 || date.day > 31 || date.month < 0 || date.month > 12 || date.year < 0) {
      return null;
    }
    return this.getDateObject(date.day, date.month, date.year);
  }

  getDateObject(day: any, month: any, year: any) {
    let tM = month.toString();
    if (tM.length === 1) {
      tM = '0' + tM;
    }
    let tD = day.toString();
    if (tD.length === 1) {
      tD = '0' + tD;
    }
    return '' + year + '-' + tM + '-' + tD;
  }

  equalWithoutTime(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() != date2.getFullYear()) {
      return false;
    }
    if (date1.getMonth() != date2.getMonth()) {
      return false;
    }
    if (date1.getDate() != date2.getDate()) {
      return false;
    }
    return true;
  }

  deepCopy(oldObj: any) {
    let newObj = oldObj;
    if (oldObj && (typeof oldObj === 'object')) {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      for (const i in oldObj) {
        if (oldObj.hasOwnProperty(i)) {
          newObj[i] = this.deepCopy(this.isValid(oldObj[i]) ? oldObj[i].valueOf() : oldObj[i]);
        }
      }
    }
    return newObj;
  }

  downloadFile(data: Blob) {
    const url = window.URL.createObjectURL(data);
    window.open(url);
  }

  downloadFileLink(data: Blob) {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = UUID.UUID();
    link.click();
  }

  isEmpty(obj: string): boolean {
    if (undefined === obj || null === obj || '' === obj){
      return true;
    }
    return false;
  }

  isNull(obj: any): boolean {
    if (undefined === obj || null === obj){
      return true;
    }
    return false;
  }

  isBothNull(obj: any, obj2: any): boolean {
    if ((undefined === obj || null === obj) && (undefined === obj2 || null === obj2)){
      return true;
    }
    return false;
  }

  isPositiveNumber(obj: number): boolean {
    if (undefined == obj || null == obj){
      return false;
    }
    if (obj >=0) {
      return true;
    }
    return false;
  }

  isNumberGreater(obj: number, num: number): boolean {
    if (undefined == obj || null == obj){
      return false;
    }
    if (obj > num) {
      return true;
    }
    return false;
  }

  getNumber(n: number): number {
    if (undefined === n || null === n || NaN === n){
      n = 0;
    }
    return n;
  }
  plus(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n2 + n1;
  }

  minus(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1 - n2;
  }

  multiply(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1 * n2;
  }

  getVatMoney(vat: number, money: number): number {
    vat = this.getNumber(vat);
    vat = this.divide(vat, 100);
    return this.multiply(money, vat);
  }

  divide(n1: number, n2: number): number {
    n1 = this.getNumber(n1);
    n2 = this.getNumber(n2);
    return n1/n2;
  }

  isNNull(obj: any): boolean {
    if (undefined != obj && null != obj){
      return true;
    }
    return false;
  }

  isArrNNull(objs: any[]): boolean {
    if (undefined != objs && null != objs && 0 < objs.length){
      return true;
    }
    return false;
  }

  isArrNull(objs: any[]): boolean {
    if (undefined === objs || null == objs || 0 === objs.length){
      return true;
    }
    return false;
  }
  
  cleanAccents = (str: string): string => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)

    return str;
}

  appentWithoutAccents(strs: string[], str2: string) {
    if (this.isNull(strs)) {
      strs = [];
    }
    strs.push(this.cleanAccents(str2));
    return strs;
  }

  showToast(translate: TranslateService, key: string) {
    translate.stream(key).subscribe(txt => {
      var toast = Toast.makeText(txt);
      toast.show();
    });
  }

  showEToast(translate: TranslateService, error: any) {
    let msg: OnesMessage = this.convertError(error);
    console.log('-------' + JSON.stringify(msg));
    let code = msg.code;
    if (this.isEmpty(code) || code === 'null') {
      code = msg.message;
    }
    translate.stream(code).subscribe(txt => {
      var toast = Toast.makeText(txt, "long");
      toast.show();
    });
  }

  encodeURL(str: string) {
    return encodeURIComponent(str);
  }
}
