import { FixedAssetType }	from './fixed.asset.type';
import { Department }	from './department';
import { Employee }	from './employee';
import { Vehicle } from './vehicle';


export class FixedAsset {
    code: string;
    name: string;
    id: number;
    assetTypeId: number;
    fixedAssetType: FixedAssetType;
    depreciationPeriod: number;
    depreciationMoney: number;
    historicalCost: number;
    status: StatusEnum;
    note: string;
    currentDepartment: number;
    department: Department;
    currentEmpoyee: number;
    employee: Employee;
    remainDepreciationMonth: number;
    remainDepreciationValue: number;
    createdOn: string;
    updatedOn: string;
    vehicle: Vehicle;
}

export const enum StatusEnum {
    WAITING_ORDER = 'WAITING_ORDER',
    ASSIGNING = 'ASSIGNING',
    MAINTAINING = 'MAINTAINING',
    LIQUIDATED = 'LIQUIDATED',
}
export const StatusEnumValue: string[] = ['WAITING_ORDER', 'ASSIGNING', 'MAINTAINING', 'LIQUIDATED'];

