import { RegionCountry }	from './region.country';
import { RegionTimezone }	from './region.timezone';


export class RegionCity {
    code: string;
    prefix: string;
    name: string;
    id: number;
    countryId: number;
    country: RegionCountry;
    timezoneId: number;
    timezone: RegionTimezone;
    isActive: boolean;
    tOrder: number;
    minSalaryMonth: number;
    minSalaryHour: number;

}


