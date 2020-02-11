import { RegionCountry }	from './region.country';
import { RegionCity }	from './region.city';
import { RegionDistrict }	from './region.district';
import { RegionWard }	from './region.ward';
import { RegionStreet }	from './region.street';


export class RegionAddress {
    id: number;
    entityType: EntityTypeEnum;
    entityId: number;
    countryId: number;
    country: RegionCountry;
    cityId: number;
    city: RegionCity;
    districtId: number;
    district: RegionDistrict;
    wardId: number;
    ward: RegionWard;
    streetId: number;
    street: RegionStreet;
    address: string;
    longitude: number;
    latitude: number;
    fullAddress: string;

}

export const enum EntityTypeEnum {
    EMPLOYEE = 'EMPLOYEE',
    PARTNER = 'PARTNER',
    DEPARTMENT = 'DEPARTMENT',
    BANK = 'BANK',
    BANK_BRANCH = 'BANK_BRANCH',
}
export const EntityTypeEnumValue: string[] = ['EMPLOYEE', 'PARTNER', 'DEPARTMENT', 'BANK', 'BANK_BRANCH'];

