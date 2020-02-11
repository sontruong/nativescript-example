import { PartnerLiability }	from './partner.liability';
import { ActionTypeEnum } from '~/app/common/objs';


export class PartnerLiabilityBuy {
    id: number;
    partnerId: number;
    partnerLiability: PartnerLiability;
    actionType: ActionTypeEnum;
    actionId: number;
    money: number;
    voucherDate: string;
    status: StatusEnum;
}

export const enum StatusEnum {
    WAITING = 'WAITING',
    COMPLETED = 'COMPLETED',
}
export const StatusEnumValue: string[] = ['WAITING', 'COMPLETED'];

