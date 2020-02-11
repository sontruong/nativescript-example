import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {PartnerLiability} from './partner.liability';
import {PartnerLiabilityFilter} from './partner.liability.filter';
import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OneSolConfig } from '~/app/config/app.config';
import { OnesPaging } from '~/app/common/objs';
import { PARTNERLIABILITY_GET_LIST, PARTNERLIABILITY_GET_DETAIL } from '~/app/config/app.api';

@Injectable({
  providedIn: "root"
})
export class PartnerliabilityService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<PartnerLiability>> {
    let partnerLiabilityFilter: PartnerLiabilityFilter = new PartnerLiabilityFilter();
  	partnerLiabilityFilter.limit = OneSolConfig.maxResult;
    var partnerLiabilitys: Observable<Array<PartnerLiability>> = this.http.post(PARTNERLIABILITY_GET_LIST.apiEndpoint, JSON.stringify(partnerLiabilityFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return partnerLiabilitys;
  }


  public search(partnerLiabilityFilter: PartnerLiabilityFilter): Observable<OnesPaging<PartnerLiability>> {
    var partnerLiabilitys: Observable<OnesPaging<PartnerLiability>> = this.http.post(PARTNERLIABILITY_GET_LIST.apiEndpoint, JSON.stringify(partnerLiabilityFilter))
      .pipe(map((res: Response) => res.json()));
    return partnerLiabilitys;
  }

  public getObj(id: any): Observable<PartnerLiability> {
    var partnerLiabilityDetail: Observable<PartnerLiability> =  this.http.get(PARTNERLIABILITY_GET_DETAIL.apiEndpoint + id)
      .pipe(map((res: Response) => res.json()));
    return partnerLiabilityDetail;
  }

}
