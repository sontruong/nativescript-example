import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OneSolConfig } from '~/app/config/app.config';
import { OnesPaging, OnesMessage } from '~/app/common/objs';
import { RECEIVEMONEY_GET_LIST, RECEIVEMONEY_DEL_OBJ, RECEIVEMONEY_EDIT_OBJ, RECEIVEMONEY_GET_DETAIL } from '~/app/config/app.api';

import {ShippingPlanReceiveMoney} from '../model/shipping.plan.receive.money';
import {ShippingPlanReceiveMoneyFilter} from '../model/shipping.plan.receive.money.filter';

@Injectable({
  providedIn: "root"
})
export class ShippingplanreceivemoneyService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<ShippingPlanReceiveMoney>> {
    let shippingPlanReceiveMoneyFilter: ShippingPlanReceiveMoneyFilter = new ShippingPlanReceiveMoneyFilter();
  	shippingPlanReceiveMoneyFilter.limit = OneSolConfig.maxResult;
    var shippingPlanReceiveMoneys: Observable<Array<ShippingPlanReceiveMoney>> = this.http.post(RECEIVEMONEY_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanReceiveMoneyFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlanReceiveMoneys;
  }


  public search(shippingPlanReceiveMoneyFilter: ShippingPlanReceiveMoneyFilter): Observable<OnesPaging<ShippingPlanReceiveMoney>> {
    var shippingPlanReceiveMoneys: Observable<OnesPaging<ShippingPlanReceiveMoney>> = this.http.post(RECEIVEMONEY_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanReceiveMoneyFilter))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanReceiveMoneys;
  }

  public deleteObj(id: any): Observable<OnesMessage> {

    var query = '?';
    if (RECEIVEMONEY_DEL_OBJ.apiEndpoint.indexOf('?') > -1) {
      query = '&';
    }
    query += id;
    var message: Observable<OnesMessage> = this.http.delete(RECEIVEMONEY_DEL_OBJ.apiEndpoint + query)
      .pipe(map((res: Response) => res.json()));
    return message;

  }


  public getObj(id: any): Observable<ShippingPlanReceiveMoney> {
    var shippingPlanReceiveMoneyDetail: Observable<ShippingPlanReceiveMoney> =  this.http.get(RECEIVEMONEY_GET_DETAIL.apiEndpoint + id)
      .pipe(map((res: Response) => res.json()));
    return shippingPlanReceiveMoneyDetail;

  }

  public save(shippingPlanReceiveMoneySave: ShippingPlanReceiveMoney): Observable<ShippingPlanReceiveMoney> {

    var shippingPlanReceiveMoneyDetail: Observable<ShippingPlanReceiveMoney> = this.http.post(RECEIVEMONEY_EDIT_OBJ.apiEndpoint, JSON.stringify(shippingPlanReceiveMoneySave))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanReceiveMoneyDetail;

  }

}
