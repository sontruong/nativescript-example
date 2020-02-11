import { EmployeeLite } from "~/app/erpshared/domain/employee.1";

export interface Item {
    id: number;
    title: string;
    role: string;
    createdOn: string;
    createdByEmp: EmployeeLite;
    content: string;
}
