import { BaseFilter } from '../../../common/objs';
import {ShippingStatus} from '../model/shipping.plan';
import { Channel } from '../../domain/channel';

export class ShippingPlanFilter extends BaseFilter {
    code: string;
    id: number;
    channelId: number[];
    channel: Channel;
    managedEmpId: number;
    salesEmpId: number;
    startDateFrom: string;
    startDateTo: string;
    statDate: any;
    expectedEndDateFrom: string;
    expectedEndDateTo: string;
    status: ShippingStatus[];
    createdOnFrom: string;
    createdOnTo: string;
}

