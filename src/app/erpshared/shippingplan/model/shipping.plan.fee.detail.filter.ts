import { BaseFilter } from '../../../common/objs';

export class ShippingPlanFeeDetailFilter extends BaseFilter {
    name: string;
    id: number;
    shippingPlanId: number;
    type: string;
    feeDateFrom: string;
    feeDateTo: string;
    createdOnFrom: string;
    createdOnTo: string;
}


