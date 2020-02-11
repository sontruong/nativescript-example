import { RegionDistrict }	from './region.district';


export class RegionWard {
    code: string;
    prefix: string;
    name: string;
    id: number;
    districtid: number;
    district: RegionDistrict;
    isActive: boolean;
    tOrder: number;

}


