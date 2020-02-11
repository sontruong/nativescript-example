import { Injectable } from "@angular/core";
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { HttpRequestService } from "../../common/http.request.service";
import { OnesPaging } from "../../common/objs";
import { PartnerFilter } from "../domain/partner.filter";
import { Partner } from "../domain/partner";

@Injectable({
    providedIn: "root"
})
export class PartnerService {
    
    constructor(private http: HttpRequestService) {
    }

    public findContact(partner: PartnerFilter): Observable<OnesPaging<Partner>> {
        var results: Observable<OnesPaging<Partner>> = this.http.post('api/partners/contact', JSON.stringify(partner))
            .pipe(map((res: Response) => res.json()));
        return results;
    }


    public search(partnerFilter: PartnerFilter): Observable<OnesPaging<Partner>> {
        var partners: Observable<OnesPaging<Partner>> = this.http.post('api/partners', JSON.stringify(partnerFilter))
          .pipe(map((res: Response) => res.json()));
        return partners;
      }
}