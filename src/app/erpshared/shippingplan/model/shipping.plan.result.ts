import { ShippingPlan }	from './shipping.plan';


export class ShippingPlanResult {
    resultId: number;
    shippingPlan: ShippingPlan;
    totalGoods: number;
    totalFee: number;
    totalVat: number;
    totalPromotionMoney: number;
    totalDebtGot: number;
    totalDebt: number;
    money: number;
    startDate: string;
    endDate: string;

}


