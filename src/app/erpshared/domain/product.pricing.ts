import { ProductPricingItem }	from './product.pricing.item';
import { ProductPricingRegion }	from './product.pricing.region';
import { GroupTypeEnum } from './product.type';
import { AccountLite } from '../../common/objs';


export class ProductPricing {
    id: number;
    name: string;
    groupType: GroupTypeEnum;
    productPricingItems: ProductPricingItem[];
    productPricingRegions: ProductPricingRegion[];
    reason: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    createdOn: string;
    updatedOn: string;
    createdBy: number;
    updatedBy: number;
    createdByUsr: AccountLite;
    updatedByUsr: AccountLite;
}


