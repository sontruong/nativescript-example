import { Injectable } from "@angular/core";
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { HttpRequestService } from "../../common/http.request.service";
import { Employee } from "../domain/employee";
import { OnesPaging } from "../../common/objs";

@Injectable({
    providedIn: "root"
})
export class EmployeeService {
    
    constructor(private http: HttpRequestService) {
    }

    public findContact(employee: Employee): Observable<OnesPaging<Employee>> {
        var results: Observable<OnesPaging<Employee>> = this.http.post('api/employees/contact', JSON.stringify(employee))
            .pipe(map((res: Response) => res.json()));
        return results;
    }
}