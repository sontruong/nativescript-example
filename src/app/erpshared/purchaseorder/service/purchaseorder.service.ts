import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';

import {PurchaseOrder} from '../model/purchase.order';
import {PurchaseOrderFilter} from '../model/purchase.order.filter';
import { OneNote, OnesPaging } from '../../../common/objs';
import { OneSolConfig } from '~/app/config/app.config';
import { PURCHASEORDER_GET_LIST, PURCHASEORDER_GET_DETAIL } from '~/app/config/app.api';


@Injectable({
  providedIn: "root"
})
export class PurchaseorderService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<PurchaseOrder>> {
    let purchaseOrderFilter: PurchaseOrderFilter = new PurchaseOrderFilter();
  	purchaseOrderFilter.limit = OneSolConfig.maxResult;
    var purchaseOrders: Observable<Array<PurchaseOrder>> = this.http.post(PURCHASEORDER_GET_LIST.apiEndpoint, JSON.stringify(purchaseOrderFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return purchaseOrders;
  }


  public search(purchaseOrderFilter: PurchaseOrderFilter): Observable<OnesPaging<PurchaseOrder>> {
    var purchaseOrders: Observable<OnesPaging<PurchaseOrder>> = this.http.post(PURCHASEORDER_GET_LIST.apiEndpoint, JSON.stringify(purchaseOrderFilter))
      .pipe(map((res: Response) => res.json()));
    return purchaseOrders;
  }


  public getObj(id: any): Observable<PurchaseOrder> {

    var query = '?';
    if (PURCHASEORDER_GET_DETAIL.apiEndpoint.indexOf('?') > -1) {
      query = '&';
    }
    query += id;
    var purchaseOrderDetail: Observable<PurchaseOrder> =  this.http.get(PURCHASEORDER_GET_DETAIL.apiEndpoint + query)
      .pipe(map((res: Response) => res.json()));
    return purchaseOrderDetail;

  }


  public requestDebt(id: any, dto: OneNote): Observable<PurchaseOrder> {
    var purchaseOrderDetail: Observable<PurchaseOrder> = this.http.post('/api/purchaseOrder/' + id + '/debt', JSON.stringify(dto))
      .pipe(map((res: Response) => res.json()));
    return purchaseOrderDetail;
  }
  
}
