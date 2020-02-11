import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OnesPaging } from '~/app/common/objs';
import { OneSolConfig } from '~/app/config/app.config';
import { SHIPPINGPLANFEEDETAIL_GET_LIST, SHIPPINGPLANFEEDETAIL_GET_DETAIL, SHIPPINGPLANFEEDETAIL_EDIT_OBJ } from '~/app/config/app.api';

import {ShippingPlanFeeDetail} from '../model/shipping.plan.fee.detail';
import {ShippingPlanFeeDetailFilter} from '../model/shipping.plan.fee.detail.filter';

@Injectable({
  providedIn: "root"
})
export class ShippingplanfeedetailService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<ShippingPlanFeeDetail>> {
    let shippingPlanFeeDetailFilter: ShippingPlanFeeDetailFilter = new ShippingPlanFeeDetailFilter();
  	shippingPlanFeeDetailFilter.limit = OneSolConfig.maxResult;
    var shippingPlanFeeDetails: Observable<Array<ShippingPlanFeeDetail>> = this.http.post(SHIPPINGPLANFEEDETAIL_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanFeeDetailFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlanFeeDetails;
  }

  public search(shippingPlanFeeDetailFilter: ShippingPlanFeeDetailFilter): Observable<OnesPaging<ShippingPlanFeeDetail>> {
    var shippingPlanFeeDetails: Observable<OnesPaging<ShippingPlanFeeDetail>> = this.http.post(SHIPPINGPLANFEEDETAIL_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanFeeDetailFilter))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanFeeDetails;
  }


  public getObj(id: any): Observable<ShippingPlanFeeDetail> {
    var shippingPlanFeeDetailDetail: Observable<ShippingPlanFeeDetail> =  this.http.get(SHIPPINGPLANFEEDETAIL_GET_DETAIL.apiEndpoint + id)
      .pipe(map((res: Response) => res.json()));
    return shippingPlanFeeDetailDetail;

  }

  public save(shippingPlanFeeDetailSave: ShippingPlanFeeDetail): Observable<ShippingPlanFeeDetail> {

    var shippingPlanFeeDetailDetail: Observable<ShippingPlanFeeDetail> = this.http.post(SHIPPINGPLANFEEDETAIL_EDIT_OBJ.apiEndpoint, JSON.stringify(shippingPlanFeeDetailSave))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanFeeDetailDetail;

  }

}
