import { PartnerLiability }	from './partner.liability';
import { ActionTypeEnum } from '~/app/common/objs';


export class PartnerLiabilitySell {
    id: number;
    partnerId: number;
    partnerLiability: PartnerLiability;
    actionType: ActionTypeEnum;
    orderId: number;
    money: number;
    voucherDate: string;
    status: StatusEnum;

}

export const enum StatusEnum {
    WAITING = 'WAITING',
    COMPLETED = 'COMPLETED',
}
export const StatusEnumValue: string[] = ['WAITING', 'COMPLETED'];

