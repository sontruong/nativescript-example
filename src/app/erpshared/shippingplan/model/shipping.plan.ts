import { ShippingPlanPurchaseOrder }	from '../model/shipping.plan.purchase.order';
import { ShippingPlanReturnPurchaseOrder }	from '../model/shipping.plan.return.purchase.order';
import { ShippingPlanVehicle }	from '../model/shipping.plan.vehicle';
import { Channel }	from '../../domain/channel';
import { Employee }	from '../../domain/employee';
import { Department } from '../../domain/department';


export class ShippingPlan {
    code: string;
    name: string;
    shippingPlanPurchaseOrders: ShippingPlanPurchaseOrder[];
    shippingPlanReturnPurchaseOrders: ShippingPlanReturnPurchaseOrder[];
    shippingPlanVehicles: ShippingPlanVehicle[];
    id: number;
    departmentId: number;
    department: Department;
    channelId: number;
    channel: Channel;
    managedEmp: Employee;
    salesEmp: Employee;
    startDate: string;
    expectedEndDate: string;
    description: string;
    totalOrder: number;
    totalOrderGot: number;
    totalDebtGot: number;
    totalFee: number;
    money: number;
    status: ShippingStatus;
    createdOn: string;
    updatedOn: string;
}

export const enum ShippingStatus {
    PENDING = 'PENDING',
    WAITING_GOODS = 'WAITING_GOODS',
    PREPARED = 'PREPARED',
    STARTED = 'STARTED',
    RETURNING = 'RETURNING',
    RETURNED = 'RETURNED',
    WAREHOUSE_COMPLETED = 'WAREHOUSE_COMPLETED',
    COMPLETED = 'COMPLETED',
    SKIP = 'SKIP',
}
export const ShippingStatusValue: string[] = ['PENDING', 'WAITING_GOODS', 'PREPARED', 'STARTED', 'RETURNING', 'RETURNED', 'WAREHOUSE_COMPLETED', 'COMPLETED', 'SKIP'];

