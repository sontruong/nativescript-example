import { FixedAsset }	from './fixed.asset';


export class Vehicle {
    id: number;
    name: string;
    fixedAsset: FixedAsset;
    assetLite: FixedAsset;
    type: VehicleTypeEnum;
    additionalLabour: number;
    loads: number;
    vehicleStatus: VehicleStatusEnum;
    fixedAssetId: number;
    actionType: VehicleActionEnum;
    actionName: string;
}

export const enum VehicleTypeEnum {
    MOTO_BIKE = 'MOTO_BIKE',
    LARGE = 'LARGE',
    MEDIUM = 'MEDIUM',
    SMALL = 'SMALL',
}
export const VehicleTypeValue: string[] = ['MOTO_BIKE', 'LARGE', 'MEDIUM', 'SMALL'];
export const enum VehicleStatusEnum {
    AVAILABLE = 'AVAILABLE',
    MAINTAINING = 'MAINTAINING',
    RETURNING = 'RETURNING',
    SHIPPING = 'SHIPPING',
}
export const VehicleStatusEnumValue: string[] = ['AVAILABLE', 'SHIPPING', 'SHIPPING', 'MAINTAINING'];

export const enum VehicleActionEnum {
    LOCAL_TRANSFER = 'LOCAL_TRANSFER',
	CHANNEL_ORDER = 'CHANNEL_ORDER',
	LIQUIDATE = 'LIQUIDATE',
}
export const VehicleActionValue: string[] = ['LOCAL_TRANSFER', 'CHANNEL_ORDER', 'LIQUIDATE'];