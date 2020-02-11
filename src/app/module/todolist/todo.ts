import { EmployeeLite } from "~/app/erpshared/domain/employee.1";

export interface ToDo {
    id: number;
    title: string;
    role: string;
    createdOn: string;
    createdByEmp: EmployeeLite;
    content: string;
    status: string;
}
