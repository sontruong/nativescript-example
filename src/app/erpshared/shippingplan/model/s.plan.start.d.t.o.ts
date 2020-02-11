import { Employee } from '../../domain/employee';
import { ShippingPlanVehicle } from './shipping.plan.vehicle';

export class SPlanStartDTO {
    saleEmployee: Employee;
    vehicleDTOs: ShippingPlanVehicle[];
}
