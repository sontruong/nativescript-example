import { Channel } from "./channel";


export class CustomerInfo {
    id: number;
    type: CustomerTypeEnum;
    level: LevelEnum;
    birthday: string;
    gender: GenderEnum;
    channelId: number;
    channel: Channel;
    status: PartnerDebtType;
}

export const enum CustomerTypeEnum {
    COFFEE_SHOP = 'COFFEE_SHOP',
    STORE = 'STORE',
    DISTRUBUTION = 'DISTRUBUTION',
    RETAIL = 'RETAIL',
    SPECIAL = 'SPECIAL',
}
export const CustomerTypeEnumValue: string[] = ['COFFEE_SHOP', 'STORE', 'DISTRUBUTION', 'RETAIL', 'SPECIAL'];
export const enum PartnerDebtType {
    NORMAL = 'NORMAL', DEBT = 'DEBT', BAD_DEBT = 'BAD_DEBT'
}
export const PartnerDebtTypeValue: string[] = ['NORMAL', 'DEBT', 'BAD_DEBT'];
export const enum LevelEnum {
    NORMAL,
    SILVER,
    GOLD,
}
export const LevelEnumValue: string[] = ['NORMAL', 'SILVER', 'GOLD'];
export const enum GenderEnum {
    MALE,
    FEMALE,
    OTHER,
}
export const GenderEnumValue: string[] = ['MALE', 'FEMALE', 'OTHER'];