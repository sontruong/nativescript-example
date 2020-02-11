

export class ProductType {
    code: string;
    name: string;
    id: number;
    groupType: GroupTypeEnum;
    isActive: boolean;
}

export const enum GroupTypeEnum {
    RAW_MATERIALS = 'RAW_MATERIALS',
    SEMI_PRODUCT = 'SEMI_PRODUCT',
    PRODUCT = 'PRODUCT',
    STATIONERY = 'STATIONERY',
    OTHER = 'OTHER',
    PROMOTION_ITEM = 'PROMOTION_ITEM'
}
export const GroupTypeEnumValue: string[] = ['RAW_MATERIALS', 'PROMOTION_ITEM', 'SEMI_PRODUCT', 'PRODUCT', 'STATIONERY', 'OTHER'];
export const ImportGroupTypeValue: string[] = ['RAW_MATERIALS', 'PROMOTION_ITEM', 'SEMI_PRODUCT', 'STATIONERY', 'OTHER'];

