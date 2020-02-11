import { StatusEnum } from '../../common/objs';

export class UnitOfMeasurement {
    code: string;
    name: string;
    id: number;
    amount: number;
    netWeight: number;
    packing: string;
    weight: number;
    status: StatusEnum;
    parentId: number;
    unit: UnitOfMeasurement;
    createdOn: string;
    updatedOn: string;
}


