import { PartnerTypeEnum, PaymentTypeEnum, PartnerProductQualityEnum, PaymentMethodEnum } from './partner';
import { BaseFilter } from '../../common/objs';

export class PartnerFilter extends BaseFilter {
    code: string;
    name: string;
    partnerType: PartnerTypeEnum[];
    email: string;
    phone: string;
    fax: string;
    website: string;
    tax: string;
    paymentType: PaymentTypeEnum[];
    quality: PartnerProductQualityEnum[];
    paymentMethod: PaymentMethodEnum[];
    productIds: number[] = [];
    createdOnFrom: string;
    createdOnTo: string;
    modifiedOnFrom: string;
    modifiedOnTo: string;
}

