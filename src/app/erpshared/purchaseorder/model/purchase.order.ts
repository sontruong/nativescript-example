import { PurchaseOrderDetail }	from '../model/purchase.order.detail';
import { PurchaseOrderPromotionPoint }	from '../model/purchase.order.promotion.point';
import { Partner }	from '../../domain/partner';
import { Department } from '../../domain/department';


export class PurchaseOrder {
    code: string;
    purchaseOrderDetails: PurchaseOrderDetail[];
    purchaseOrderPromotionPoints: PurchaseOrderPromotionPoint[];

    id: number;
    partnerId: number;
    partner: Partner;
    departmentId: number;

    department: Department;
    orderDate: string;
    description: string;
    totalGoods: number;
    totalMoney: number;
    totalVat: number;
    paid: number;
    totalPoint: number;
    status: POStatusEnum;
    approvedOn: string;
    createdOn: string;
    updatedOn: string;

    shippingplanId: number;
    expectedShipingFrom: string;
    expectedShipingTo: string;
}

export const enum POStatusEnum {
    WAITING_APPROVE = 'WAITING_APPROVE',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    WAINGTING_SHIP = 'WAINGTING_SHIP',
    WAITING_PAYMENT = 'WAITING_PAYMENT',
    WAITING_SCHEDULE = 'WAITING_SCHEDULE',
    PAID = 'PAID',
    COMPLETED = 'COMPLETED',
}
export const StatusEnumValue: string[] = ['WAITING_APPROVE', 'APPROVED', 'REJECTED', 'WAINGTING_SHIP', 'WAITING_SCHEDULE', 'COMPLETED', 'WAITING_PAYMENT'];

