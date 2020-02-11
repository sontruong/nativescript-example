import { Product }	from '../../domain/product';


export class PurchaseOrderPromotionPoint {
    productId: number;
    product: Product;
    promotionId: number;
    amount: number;
    point: number;
}


