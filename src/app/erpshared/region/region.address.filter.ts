import {EntityTypeEnum} from './region.address';

export class RegionAddressFilter {
    entityType: EntityTypeEnum;
    entityId: number;
    countryId: number[];
    cityId: number[];
    districtId: number[];
    wardId: number[];
    streetId: number[];
    address: string;
    fullAddress: string;
    isLite: boolean;
    page: number;
    limit: number;
}
