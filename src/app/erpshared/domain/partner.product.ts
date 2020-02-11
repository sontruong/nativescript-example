import { Product } from "./product";
import { PartnerProductQualityEnum, Partner } from "./partner";

export class PartnerProduct {
    partnerId: number;
    partner: Partner;
    productTypeId: number;
    productId: number;
    product: Product;
    productQuaility: PartnerProductQualityEnum;
    defaultShippingDay: number;
}