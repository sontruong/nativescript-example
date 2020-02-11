import { Partner }	from '../../domain/partner';
import { Product }	from '../../domain/product';


export class ShippingPlanReturnPurchaseOrder {
    partnerId: number;
    partner: Partner;
    productId: number;
    product: Product;
    amount: number;
    price: number;
    vat: number;
    receivedOn: string;
    createdOn: string;
}
