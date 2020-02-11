import { Department } from "./department";
import { Position } from "./position";

export class Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: Position;
    department: Department;
    limit: number;
}