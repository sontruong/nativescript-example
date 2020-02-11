import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Request, Response, Headers, ResponseContentType} from '@angular/http';

import {LocalStorageService} from './local-storage.service';
import * as AppConfig from '../config/app.config';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpRequestService extends Http {

  private storageService: LocalStorageService = new LocalStorageService();

  constructor(protected backend: ConnectionBackend, protected defaultOptions: RequestOptions, private _router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.request(url, options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(this.fullPath(url), this.getRequestOptionArgs(options)));
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(this.fullPath(url), body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(this.fullPath(url), body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(this.fullPath(url), this.getRequestOptionArgs(options)));
  }

  getDownload(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(this.fullPath(url), this.getDownloadRequestOptionArgs(options)));
  }

  postDownload(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(this.fullPath(url), body, this.getDownloadRequestOptionArgs(options)));
  }

  postUpload(url: string, file: any, options?: RequestOptionsArgs): Observable<Response> {
    const formData = new FormData();
    formData.append('file', file);
    return this.intercept(super.post(this.fullPath(url), formData, this.postUploadRequestOptionArgs(options)));
  }

  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
      options.headers.append('Authorization', this.storageService.get('access_token'));
      options.headers.append('Content-Type', 'application/json;charset=UTF-8');
    }
    options.withCredentials = true;
    return options;
  }

  getDownloadRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
      options.headers.append('Authorization', this.storageService.get('access_token'));
      options.headers.append('Content-Type', 'application/json;charset=UTF-8');
    }
    options.withCredentials = true;
    options.responseType = ResponseContentType.Blob;
    return options;
  }

  postUploadRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options === null) {
      options = new RequestOptions();
    } else {
      return options;
    }
    if (options.headers === null) {
      options.headers = new Headers();
      options.headers.append('Authorization', this.storageService.get('access_token'));
      options.headers.append('Content-Type', 'application/json;charset=UTF-8');
    }
    options.withCredentials = true;
    options.responseType = ResponseContentType.Blob;
    return options;
  }

  getUploadRequestOptionArgs(resType: ResponseContentType, reqContentType: string): RequestOptionsArgs {
    const options: RequestOptionsArgs = new RequestOptions();
    if (options.headers == null) {
      options.headers = new Headers();
      options.headers.append('Authorization', this.storageService.get('access_token'));
      if (null != reqContentType) {
        options.headers.append('Content-Type', reqContentType);
      }
    }
    options.withCredentials = true;
    options.responseType = resType;
    return options;
  }

  private fullPath(path: string): string {
    if (!path.startsWith('http://') && !path.startsWith('https://')) {
      path = AppConfig.rootService + path;
    }
    console.log('fpath: ' + path);
    return path;
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable.pipe(catchError((err, source) => {
      if (err.status === 401) {
        this.storageService.save(AppConfig.OneSolConfig.lstorageUsrName, null);
        this._router.navigate([AppConfig.URL_LOGIN]);
      } else {
        throw err;
      }
      return observable;
    }));
  }
}
