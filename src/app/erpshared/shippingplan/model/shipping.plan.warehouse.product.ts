import { Product } from '../../domain/product';
import { Department } from '../../domain/department';

export class ShippingPlanWarehouseProduct {
    id: number;
    shippingPlanId: number;
    productId: number;
    product: Product;
    departmentId: number;
    department: Department;
    lotNumber: string;
    amount: number;
    returnedAmount: number;
    unitId: number;
    wExported: number;
    wImported: number;
}


