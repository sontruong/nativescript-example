import { CustomerInfo } from "./customer.info";
import { PartnerProduct } from "./partner.product";

export class Partner {
    code: string;
    name: string;
    id: number;
    partnerType: PartnerTypeEnum;
    email: string;
    phone: string;
    fax: string;
    website: string;
    tax: string;
    paymentType: PaymentTypeEnum;
    quality: PartnerProductQualityEnum;
    paymentMethod: PaymentMethodEnum;
    createdOn: string;
    modifiedOn: string;
    info: CustomerInfo;
    productIds: number[] = [];
    products: PartnerProduct[] = [];
    promotionPoint: number;
}

export const enum PartnerTypeEnum {
    BOTH = 'BOTH',
    CUSTOMER = 'CUSTOMER',
    SUPPLIER = 'SUPPLIER',
}
export const PartnerTypeEnumValue: string[] = ['BOTH', 'CUSTOMER', 'SUPPLIER'];
export const enum PaymentTypeEnum {
    PREPAID,
    DEPOSIT,
    POSTPAY,
}
export const PaymentTypeEnumValue: string[] = ['PREPAID', 'DEPOSIT', 'POSTPAY'];
export const enum PartnerProductQualityEnum {
    NORMAL,
    GOOD,
    HIGH,
    AVERAGE,
    BAD,
}
export const PartnerProductQualityValue: string[] = ['NORMAL', 'GOOD', 'HIGH', 'AVERAGE', 'BAD'];
export const enum PaymentMethodEnum {
    CASH,
    BANK,
    BOTH,
}
export const PaymentMethodEnumValue: string[] = ['CASH', 'BANK', 'BOTH'];

