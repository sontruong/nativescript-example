import { Product } from '../../domain/product';

export class ShippingPlanAdditionalProduct {
    id: number;
    shippingPlanId: number;
    productId: number;
    product: Product;
    amount: number;
}


