

export class FixedAssetType {
    name: string;
    id: number;
    type: AssetGroupEnum;
    defaultDepreciationPeriod: number;
    defaultVat: number;
    shippingDay: number;
    note: string;
    createdOn: string;
    updatedBy: number;
}

export const enum AssetGroupEnum {
    CONSTRUCTION = 'CONSTRUCTION',
    MACHINERY = 'MACHINERY',
    VEHICLES = 'VEHICLES',
    TOOLS = 'TOOLS',
    FARMING_EQUIPMENT = 'FARMING_EQUIPMENT',
    COPYRIGHT = 'COPYRIGHT',
    OTHER_ASSETS = 'OTHER_ASSETS',
}
export const AssetGroupEnumValue: string[] = ['CONSTRUCTION', 'MACHINERY', 'VEHICLES', 'TOOLS', 'FARMING_EQUIPMENT', 'COPYRIGHT', 'OTHER_ASSETS'];

