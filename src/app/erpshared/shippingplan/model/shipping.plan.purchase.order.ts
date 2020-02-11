import { PurchaseOrder }	from '../../purchaseorder/model/purchase.order';


export class ShippingPlanPurchaseOrder {
    orderId: number;
    purchaseOrder: PurchaseOrder;
    delivered: boolean;
}


