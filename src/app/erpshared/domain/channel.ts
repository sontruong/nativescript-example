import { Employee }	from './employee';
import { Department } from './department';
import { Vehicle, VehicleTypeEnum } from './vehicle';
import { StatusEnum } from '../../common/objs';

export class Channel {
    code: string;
    name: string;
    id: number;
    departmentId: number;
    department: Department;
    labourDriver: number;
    defaultDeliverDates: string;
    vehicleType: VehicleTypeEnum;
    vehicleId: number;
    vehicle: Vehicle;
    numOfExpectedDays: number;
    status: StatusEnum;
    shippedEmployeeId: number;
    shippedEmployee: Employee;
    salesEmployeeId: number;
    saleEmp: Employee;
    managedEmployeeId: number;
    managedEmp: Employee;
    createdOn: string;
    updatedOn: string;
}


