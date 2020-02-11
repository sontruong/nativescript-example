import { RegionCity }	from './region.city';


export class RegionDistrict {
    code: string;
    prefix: string;
    name: string;
    id: number;
    cityId: number;
    city: RegionCity;
    isActive: boolean;
    tOrder: number;

}


