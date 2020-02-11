import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import {ShippingPlanWarehouseProduct} from '../model/shipping.plan.warehouse.product';
import {ShippingPlanWarehouseProductFilter} from '../model/shipping.plan.ware.product.filter';
import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OneSolConfig } from '~/app/config/app.config';
import { OnesPaging, OnesMessage } from '~/app/common/objs';

@Injectable({
  providedIn: "root"
})
export class ShippingplanWarehouseproductService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<ShippingPlanWarehouseProduct>> {
    let shippingPlanReturnProductFilter: ShippingPlanWarehouseProductFilter = new ShippingPlanWarehouseProductFilter();
  	shippingPlanReturnProductFilter.limit = OneSolConfig.maxResult;
    var shippingPlanReturnProducts: Observable<Array<ShippingPlanWarehouseProduct>> = this.http.post('/api/shipping/warehouseproducts', JSON.stringify(shippingPlanReturnProductFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlanReturnProducts;
  }

  public searchForTypeAhead(shippingPlanReturnProductFilter: ShippingPlanWarehouseProductFilter): Observable<Array<ShippingPlanWarehouseProduct>> {
    var shippingPlanReturnProducts: Observable<Array<ShippingPlanWarehouseProduct>> = this.http.post('/api/shipping/warehouseproducts', JSON.stringify(shippingPlanReturnProductFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlanReturnProducts;
  }

  public search(shippingPlanReturnProductFilter: ShippingPlanWarehouseProductFilter): Observable<OnesPaging<ShippingPlanWarehouseProduct>> {
    var shippingPlanReturnProducts: Observable<OnesPaging<ShippingPlanWarehouseProduct>> = this.http.post('/api/shipping/warehouseproducts', JSON.stringify(shippingPlanReturnProductFilter))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanReturnProducts;
  }

  public deleteObj(id: any): Observable<OnesMessage> {

    var message: Observable<OnesMessage> = this.http.delete('/api/shipping/warehouseproduct?id=' + id)
      .pipe(map((res: Response) => res.json()));
    return message;

  }

  public save(shippingPlanReturnProductSave: ShippingPlanWarehouseProduct): Observable<ShippingPlanWarehouseProduct> {

    var shippingPlanReturnProductDetail: Observable<ShippingPlanWarehouseProduct> = this.http.post('/api/shipping/warehouseproduct', JSON.stringify(shippingPlanReturnProductSave))
      .pipe(map((res: Response) => res.json()));
    return shippingPlanReturnProductDetail;

  }

  public initWarehouseObjs(warehouseProducts: ShippingPlanWarehouseProduct[]): any[] {
    let objs: any[] = [];
    for (let detail of warehouseProducts) {
      let exist = false;
      for (let obj of objs) {
        if (detail.departmentId === obj.departmentId) {
          obj = this.updateDepartmentProduct(obj, detail);
          exist = true;
          break;
        }
      }

      if (!exist) {
        let obj = this.createDepartmentProduct(detail);
        objs.push(obj);
      }
    }

    return objs;
  }


  createDepartmentProduct(detail: ShippingPlanWarehouseProduct): any {
    return {"departmentId": detail.departmentId, "department": detail.department, 
            "products": [{"productId": detail.productId, "product": detail.product, "amount": detail.amount, "returnedAmount": detail.returnedAmount, "wTotalExported": detail.wExported, 
                          "packages": [{"lotNumber": detail.lotNumber, "amount": detail.amount, "returnedAmount": detail.returnedAmount, "wExported": detail.wExported, "wImported": detail.wImported}]}]};
  }

  updateDepartmentProduct(obj: any, detail: ShippingPlanWarehouseProduct): any {
    let exist: boolean = false;
    for (let product of obj.products) {
      if (product.productId === detail.productId) {
        product = this.updatePackages(product, detail);
        exist = true;
      }
    }
    if (!exist) {
      let nProduct = {"productId": detail.productId, "product": detail.product, "amount": detail.amount, "returnedAmount": detail.returnedAmount, "wTotalExported": detail.wExported,
                        "packages": [{"lotNumber": detail.lotNumber, "amount": detail.amount, "returnedAmount": detail.returnedAmount, "wExported": detail.wExported, "wImported": detail.wImported}]};
      obj.products.push(nProduct);
    }
    return obj;
  }

  updatePackages(product: any, detail: ShippingPlanWarehouseProduct): any {
    let packages: any[] = product.packages;
    product.amount = this.utils.plus(product.amount, detail.amount);
    product.returnedAmount = this.utils.plus(product.returnedAmount, detail.returnedAmount);
    for (let i in packages) {
      let packageg = packages[i];
      if (packageg.lotNumber === detail.lotNumber) {
        packageg.amount = this.utils.plus(packageg.amount, detail.amount);
        packageg.returnedAmount = this.utils.plus(packageg.returnedAmount, detail.returnedAmount);
      } else {
        let nPackage = {"lotNumber": detail.lotNumber, "amount": detail.amount, "returnedAmount": detail.returnedAmount, "wExported": detail.wExported, "wImported": detail.wImported};
        packages.push(nPackage);
      }
      product.wTotalExported = this.utils.plus(product.wTotalExported, detail.amount);
    }
    product.packages = packages;
    return product;
  }
}
