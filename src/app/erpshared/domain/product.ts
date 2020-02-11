import { ProductType, GroupTypeEnum }	from './product.type';
import { UnitOfMeasurement }	from './unit.of.measurement';


export class Product {
    code: string;
    name: string;
    id: number;
    groupType: GroupTypeEnum;
    typeId: number;
    productType: ProductType;
    unitId: number;
    unit: UnitOfMeasurement;
    minNotification: number;
    defaultVAT: number;
}

