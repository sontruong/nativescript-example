import { Product }	from '../../domain/product';


export class PurchaseOrderDetail {
    productId: number;
    product: Product;
    quantity: number;
    price: number;
    point: number;
    additionalPrice: number;
    vat: number;
    amount: number;
    orderType: OrderTypeEnum;
    expiredDate: string;
}

export const enum OrderTypeEnum {
    BOUGHT = 'BOUGHT',
    PROMOTION = 'PROMOTION',
}
export const OrderTypeEnumValue: string[] = ['BOUGHT', 'PROMOTION'];

