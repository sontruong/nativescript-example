import {OnesSort} from '../../../common/objs';
import {POStatusEnum} from '../model/purchase.order';

export class PurchaseOrderFilter {
    code: string;
    id: number;
    partnerId: number;
    channelId: number;
    orderDateFrom: string;
    orderDateTo: string;
    totalPoint: number;
    status: POStatusEnum[];
    isLite: boolean;
    page: number;
    limit: number;

    sortDTOs: OnesSort[];
}

