import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import {ShippingPlanAdditionalProduct} from '../model/shipping.plan.additional.product';
import {ShippingPlanAdditionalProductFilter} from '../model/shipping.plan.additional.product.filter';
import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OneSolConfig } from '~/app/config/app.config';
import { OnesPaging, OnesMessage } from '~/app/common/objs';
import { ADDITIONALPR_GET_LIST, ADDITIONALPR_EDIT_OBJ } from '~/app/config/app.api';

@Injectable({
  providedIn: "root"
})
export class ShippingplanadditionalproductService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<ShippingPlanAdditionalProduct>> {
    let shippingPlanAdditionalProductFilter: ShippingPlanAdditionalProductFilter = new ShippingPlanAdditionalProductFilter();
  	shippingPlanAdditionalProductFilter.limit = OneSolConfig.maxResult;
    var shippingPlanAdditionalProducts: Observable<Array<ShippingPlanAdditionalProduct>> = this.http.post(ADDITIONALPR_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanAdditionalProductFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlanAdditionalProducts;
  }

  public search(shippingPlanAdditionalProductFilter: ShippingPlanAdditionalProductFilter): Observable<OnesPaging<ShippingPlanAdditionalProduct>> {
    var shippingPlanAdditionalProducts: Observable<OnesPaging<ShippingPlanAdditionalProduct>> = this.http.post(ADDITIONALPR_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanAdditionalProductFilter))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanAdditionalProducts;
  }

  public save(shippingPlanAdditionalProductSave: ShippingPlanAdditionalProduct): Observable<ShippingPlanAdditionalProduct> {

    var shippingPlanAdditionalProductDetail: Observable<ShippingPlanAdditionalProduct> = this.http.post(ADDITIONALPR_EDIT_OBJ.apiEndpoint, JSON.stringify(shippingPlanAdditionalProductSave))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanAdditionalProductDetail;

  }

  public saves(shippingId: number, shippingPlanAdditionalProductSave: ShippingPlanAdditionalProduct[]): Observable<OnesMessage> {

    var shippingPlanAdditionalProductDetail: Observable<OnesMessage> = this.http.post('/api/additional/product/' + shippingId, JSON.stringify(shippingPlanAdditionalProductSave))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanAdditionalProductDetail;
  }


}
