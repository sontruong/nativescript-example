import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import {ShippingPlan} from '../model/shipping.plan';
import {ShippingPlanFilter} from '../model/shipping.plan.filter';
import {SPlanPrepareDTO} from '../model/s.plan.prepare.d.t.o';
import {SPlanStartDTO} from '../model/s.plan.start.d.t.o';
import { ShippingPlanAdditionalProduct } from '../model/shipping.plan.additional.product';
import { PartnerLiability } from '../../liability/partner.liability';
import { Product } from '../../domain/product';
import { SPConfirmPrepareDTO } from '../model/s.p.confirm.reserve.d.t.o';

import { HttpRequestService } from '~/app/common/http.request.service';
import { Utils } from '~/app/common/Utils';
import { OnesPaging, OnesMessage, OneNote } from '~/app/common/objs';
import { OneSolConfig } from '~/app/config/app.config';
import { SHIPPINGPLAN_GET_LIST, SHIPPINGPLAN_GET_DETAIL } from '~/app/config/app.api';


@Injectable({
  providedIn: "root"
})
export class ShippingplanService {

  constructor(private http: HttpRequestService, private utils: Utils) {
  }

  public getMaxFirst(): Observable<Array<ShippingPlan>> {
    let shippingPlanFilter: ShippingPlanFilter = new ShippingPlanFilter();
  	shippingPlanFilter.limit = OneSolConfig.maxResult;
    var shippingPlans: Observable<Array<ShippingPlan>> = this.http.post(SHIPPINGPLAN_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanFilter))
      .pipe(map((res: Response) => {
        let jsonObj = res.json();
        return jsonObj.content;
      }));
    return shippingPlans;
  }


  public search(shippingPlanFilter: ShippingPlanFilter): Observable<OnesPaging<ShippingPlan>> {
    var shippingPlans: Observable<OnesPaging<ShippingPlan>> = this.http.post(SHIPPINGPLAN_GET_LIST.apiEndpoint, JSON.stringify(shippingPlanFilter))
      .pipe(map((res: Response) => res.json()));
    return shippingPlans;
  }

  public getObj(id: any): Observable<ShippingPlan> {
    var shippingPlanDetail: Observable<ShippingPlan> =  this.http.get(SHIPPINGPLAN_GET_DETAIL.apiEndpoint + id + "&lite=false")
      .pipe(map((res: Response) => res.json()));
    return shippingPlanDetail;

  }

  public generateName(data: ShippingPlan[]) {
    if (this.utils.isArrNNull(data)) {
      for (let detail of data) {
        detail.name = detail.code + ' (' + this.utils.parseNumberToStringDate(detail.startDate) + ")";
      }
    }
    return data;
  }


  public confirmPrepare(id: any, dto: SPConfirmPrepareDTO): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/confirmPrepare/' + id, JSON.stringify(dto))
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public waiting_goodsAction(id: any): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/waiting_goods/' + id, null)
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public preparedAction(id: any, dto: SPlanPrepareDTO): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/prepared/' + id, JSON.stringify(dto))
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public startedAction(id: any, dto: SPlanStartDTO): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/started/' + id, JSON.stringify(dto))
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public returningAction(id: any, note: OneNote): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/returning/' + id, JSON.stringify(note))
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public returnedAction(id: any): Observable<OnesMessage> {
    var result: Observable<OnesMessage> = this.http.post('/api/shippingPlan/returned/' + id, null)
      .pipe(map((res: Response) => res.json()));
    return result;
  }

  public calculatingProductList(shipping: ShippingPlan, addProducts: ShippingPlanAdditionalProduct[]): any[]{
    if (this.utils.isNull(shipping)) {
      shipping = new ShippingPlan();
    }
    let objs = [];
    if (this.utils.isArrNull(addProducts)) {
      addProducts = [];
    }
    for (let i in addProducts) {
      let detail = addProducts[i];
      let exist = false;
      for (let j in objs) {
        let detail1 = objs[j];
        if (detail.productId === detail1.productId) {
          detail1.bringAmount = this.utils.plus(detail1.bringAmount, detail.amount);
          exist = true;
        }
      }
      if (!exist) {
        let obj = {"productId": detail.productId, "product": detail.product, "saleAmount" : detail.amount, "receiveAmount" : 0};
        objs.push(obj);
      }
    }
    if (this.utils.isArrNull(shipping.shippingPlanPurchaseOrders)) {
      shipping.shippingPlanPurchaseOrders = [];
    }
    for (let i in shipping.shippingPlanPurchaseOrders) {
      let order = shipping.shippingPlanPurchaseOrders[i];
      for (let k in order.purchaseOrder.purchaseOrderDetails) {
        let detail = order.purchaseOrder.purchaseOrderDetails[k];
        let exist = false;
        for (let detail1 of objs) {
          if (detail.productId === detail1.productId) {
            detail1.saleAmount = this.utils.plus(detail1.saleAmount, detail.amount);
            exist = true;
          }
        }
        if (!exist) {
          let obj = {"productId": detail.productId, "product": detail.product, "saleAmount" : detail.amount, "receiveAmount" : 0};
          objs.push(obj);
        }
      }
    }
    if (this.utils.isArrNull(shipping.shippingPlanReturnPurchaseOrders)) {
      shipping.shippingPlanReturnPurchaseOrders = [];
    }
    for (let i in shipping.shippingPlanReturnPurchaseOrders) {
      let detail = shipping.shippingPlanReturnPurchaseOrders[i];
      let exist = false;
      for (let j in objs) {
        let detail1 = objs[j];
        if (detail.productId === detail1.productId) {
          detail1.bringAmount = this.utils.plus(detail1.getAmount, detail.amount);
          exist = true;
        }
      }
      if (!exist) {
        let obj = {"productId": detail.productId, "product": detail.product, "saleAmount" : 0, "receiveAmount" : detail.amount};
        objs.push(obj);
      }
    }
    return objs;
  }

  public calculatingProgress(shipping: ShippingPlan, liabilities: PartnerLiability[]): any[]{
    let objs = [];
    
    // purchase order
    if (this.utils.isArrNull(shipping.shippingPlanPurchaseOrders)) {
      shipping.shippingPlanPurchaseOrders = [];
    }
    for (let i in shipping.shippingPlanPurchaseOrders) {
      let order = shipping.shippingPlanPurchaseOrders[i];
      let completed = false;
      if (this.utils.isNNull(order.purchaseOrder) && true === order.delivered) {
        completed = true;
      }
      let exist = false;
      for (let j in objs) {
        let obj = objs[j];
        if (order.purchaseOrder.partnerId === obj.partnerId) {
          exist = true;
          obj.purchaseOrder = order.purchaseOrder;
          obj.goods = this.updateInfos(obj.goods, order.purchaseOrder.purchaseOrderDetails, false);
          obj.goods = this.updateInfos(obj.goods, order.purchaseOrder.purchaseOrderPromotionPoints, false);
          obj.completed = completed;
        }
      }
      if (!exist) {
        let obj = {"partnerId": order.purchaseOrder.partnerId, "partner": order.purchaseOrder.partner, "liability" : 0,
              "purchaseOrder" : order.purchaseOrder, "goods": [], "completed" : completed};
        obj.goods = this.updateInfos(obj.goods, order.purchaseOrder.purchaseOrderDetails, false);
        obj.goods = this.updateInfos(obj.goods, order.purchaseOrder.purchaseOrderPromotionPoints, false);
        
        objs.push(obj);
      }
    }
    
    if (this.utils.isArrNull(shipping.shippingPlanReturnPurchaseOrders)) {
      shipping.shippingPlanReturnPurchaseOrders = [];
    }
    for (let i in shipping.shippingPlanReturnPurchaseOrders) {
      let detail = shipping.shippingPlanReturnPurchaseOrders[i];
      let exist = false;
      let completed = false;
      if (this.utils.isNNull(detail.receivedOn)) {
        completed = true;
      }
      for (let j in objs) {
        let obj = objs[j];
        if (detail.partnerId === obj.partnerId) {
          exist = true;
          obj.goods = this.updateInfo(obj.goods, detail, true);
          if (obj.completed != true) {
            obj.completed = completed;
          }
        }
        
      }
      if (!exist) {
        let objP = {"partnerId": detail.partnerId, "partner": detail.partner, "liability" : 0,
              "purchaseOrder" : {}, "goods": [], "completed" : completed};
        objP.goods = this.updateInfo([], detail, true);

        objs.push(objP);
      }
    }
    if (this.utils.isArrNull(liabilities)) {
      liabilities = [];
    }
    for (let i in liabilities) {
      let detail = liabilities[i];
      let exist = false;
      for (let j in objs) {
        let obj = objs[j];
        if (detail.partnerId === obj.partnerId) {
          obj.liability = this.utils.plus(obj.liability, detail.totalMoney);
          exist = true;
        }
      }
      if (!exist) {
        let obj = {"partnerId": detail.partnerId, "partner": detail.partner, "liability" : detail.totalMoney, "purchaseOrder" : {}, "goods": []};
        objs.push(obj);
      }
    }
    
    return objs;
  }

  private updateInfos(result: any[], objs: any[], proReturn: boolean): any[] {
    if (this.utils.isArrNull(result)) {
      result = [];
    }
    if (this.utils.isArrNull(objs)) {
      return result;
    }
    for (let i in objs) {
      result = this.updateInfo(result, objs[i], proReturn);
    }
    return result;
  }

  private updateInfo(result: any[], obj: any, proReturn: boolean): any[] {
    if (this.utils.isArrNull(result)) {
      result = [];
    }
    if (this.utils.isNull(obj)) {
      return result;
    }
    if (proReturn) {
      result = this.updateGoodsInfo(result, obj.product, 0, obj.amount);
    } else {
      result = this.updateGoodsInfo(result, obj.product, obj.amount, 0);
    }

    return result;
  }

  private updateGoodsInfo(goods: any[], product: Product, saleAmount: number, receiveAmount: number): any[] {
    if (this.utils.isArrNull(goods)) {
      goods = [];
    }
    if (this.utils.isNull(product)) {
      return goods;
    }
    let exist = false;
    for (let i in goods) {
      let detail = goods[i];
      if (detail.product.id === product.id) {
        exist = true;
        detail.saleAmount = this.utils.plus(detail.saleAmount, saleAmount);
        detail.receiveAmount = this.utils.plus(detail.receiveAmount, receiveAmount);
      }
    }
    if (!exist) {
      let obj = this.createGoodInfo(product, saleAmount, receiveAmount);
      goods.push(obj);
    }
    return goods;
  }
  
  private createGoodInfo(product: Product, saleAmount: number, receiveAmount: number): any {
    return {"productId": product.id, "product": product, "saleAmount": saleAmount, "receiveAmount" : receiveAmount};
  }
}
