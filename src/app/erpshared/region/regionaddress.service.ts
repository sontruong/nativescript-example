import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RegionAddress} from './region.address';
import {RegionAddressFilter} from './region.address.filter';
import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OneSolConfig } from '~/app/config/app.config';
import { OnesPaging } from '~/app/common/objs';
import { ADDRESS_GET_LIST } from '~/app/config/app.api';

@Injectable({
  providedIn: "root"
})
export class RegionaddressService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<RegionAddress>> {
    let regionAddressFilter: RegionAddressFilter = new RegionAddressFilter();
  	regionAddressFilter.limit = OneSolConfig.maxResult;
    var regionAddresss: Observable<Array<RegionAddress>> = this.http.post(ADDRESS_GET_LIST.apiEndpoint, JSON.stringify(regionAddressFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return regionAddresss;
  }

  public search(regionAddressFilter: RegionAddressFilter): Observable<OnesPaging<RegionAddress>> {
    var regionAddresss: Observable<OnesPaging<RegionAddress>> = this.http.post(ADDRESS_GET_LIST.apiEndpoint, JSON.stringify(regionAddressFilter))
      .pipe(map((res: Response) => res.json()));
    return regionAddresss;
  }

  public getObjByEntity(entityType: any, entityId: any): Observable<RegionAddress> {
    var regionAddressDetail: Observable<RegionAddress> =  this.http.get('/api/address/entity?type=' + entityType + '&entityId=' + entityId)
      .pipe(map((res: Response) => this.utils.getJson(res)));
    return regionAddressDetail;
  }
}
