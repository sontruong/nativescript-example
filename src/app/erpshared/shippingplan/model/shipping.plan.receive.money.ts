import { ShippingPlan }	from './shipping.plan';
import { Partner } from '../../domain/partner';


export class ShippingPlanReceiveMoney {
    id: number;
    shippingPlanId: number;
    shippingPlan: ShippingPlan;
    partnerId: number;
    partner: Partner;
    porderMoney: number;
    liabilityMoney: number;
    differenceMoney: number;
    receivedMoney: number;
    money: number;
    receivedDate: string;
}


