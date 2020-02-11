import { BaseFilter } from '../../../common/objs';

export class ShippingPlanReceiveMoneyFilter extends BaseFilter {
    id: number;
    shippingPlanId: number;
    partnerId: number;
    receivedDateFrom: string;
    receivedDateTo: string;
}


