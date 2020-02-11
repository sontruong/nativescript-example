import { Partner }	from '../domain/partner';

export class PartnerLiability {
    partnerId: number;
    partner: Partner;
    totalMoneyDebt: number;
    totalMoneyCredit: number;
    totalMoney: number;
    updatedOn: string;
}


