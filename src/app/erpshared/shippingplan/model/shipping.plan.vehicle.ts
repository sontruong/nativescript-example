import { Vehicle }	from '../../domain/vehicle';
import { Employee } from '../../domain/employee';


export class ShippingPlanVehicle {
    vehicleId: number;
    vehicle: Vehicle;
    shipEmployeeId1: number;
    shipEmployeeId2: number;
    shipEmployee1: Employee;
    shipEmployee2: Employee;
}


