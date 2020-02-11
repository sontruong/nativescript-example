import { ShippingPlan }	from './shipping.plan';


export class ShippingPlanFeeDetail {
    id: number;
    title: string;
    number: string;
    shippingPlanId: number;
    shippingPlan: ShippingPlan;
    feeDate: string;
    fee: number;
    vat: number;
    total: number;
    accountantAccount: number;
    createdOn: string;
    updatedOn: string;

}


