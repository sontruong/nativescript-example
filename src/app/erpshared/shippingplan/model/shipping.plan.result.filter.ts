import { BaseFilter } from '../../../common/objs';

export class ShippingPlanResultFilter extends BaseFilter {
    resultId: number[];
    startDateFrom: string;
    startDateTo: string;
    endDateFrom: string;
    endDateTo: string;
}


