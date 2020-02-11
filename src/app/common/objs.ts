import { Employee } from "../erpshared/domain/employee";


export class OneFunction {
  name: string;
  functionKey: string;
  api: string;
  icon: string;
  childrenFunction: OneFunction[];
}

export class AppUser {
  id: number;
  employeeId: number;
  employee: Employee;
  username: string;
  fullName: string;
  avatar: string;
  roles: string[];
  apiFunctions: OneFunction[];
  menuFunctions: OneFunction[];
  hrDepartment: any[];
  warehouseDepartment: any[];
  productionDepartment: any[];
  salesDepartment: any[];
  financesDepartment: any[];
  channelsDepartment: any[];
  countryId: number;
  user: any;
}

export class DropdownListItem {
  public id: any;
  public itemName: string;
  constructor(id: any, itemName: string) {
    this.id = id;
    this.itemName = itemName;
  }
}

export class OnesSort {
    property: string;
    direction: string;
}

export class OnesMessage {
    code: string;
    message: string;
    type: string;
    violations: any[];
}

export class OnesPaging<T> {
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    // sort: any;
    totalElements: number;
    totalPages: number;
    content: T[];

    constructor(data: any) {
        this.first = data.first;
        this.last = data.last;
        this.number = data.number;
        this.numberOfElements = data.numberOfElements;
        this.size = data.size;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.content = data.content;
    }
}

export class OneNote {
  note: string;
}

export class BaseFilter {
  public isLite: boolean;
  public page: number;
  public limit: number;
  public sortDTOs: OnesSort[];
  public searchString: string;
}

export class ZTarget {
  id: number;
	code: string;
	name: string;
	type: string;
}

export class ObjLite {
  id: number;
	code: string;
	name: string;
	type: string;
}

export class AccountLite {
  id: number;
	username: string;
	email: string;
  avatar: string;
  status: string;
}

export class HereMapObj {
  Response: HereMapGeoResponse;
}

export class HereMapGeoResponse {
  View: HereMapGeoResponseView[];
  MetaInfo: HereMapGeoResponseInfo;
}

export class HereMapGeoResponseView {
  _type: string;
  ViewId: number;
  Result: HereMapGeoResponseResult[];
}

export class HereMapGeoResponseResult {
  Relevance: number;
  MatchLevel: string;
  MatchType: string;
  MatchQuality: any;
  Location: HereLocation;
}

export class HereLocation {
  LocationId: string;
  LocationType: string;
  DisplayPosition: Position;
  NavigationPosition: Position;
}

export class Position {
  Latitude: number;
  Longitude: number;
}

export class HereMapGeoResponseInfo {
  Timestamp: string;
}

export const enum StatusEnum {
  ACTIVE,DEACTIVE
}
export const StatusEnumValue: string[] = ['ACTIVE', 'DEACTIVE'];

export const enum ActionTypeEnum {
  IMPORT_PRODUCT = 'IMPORT_PRODUCT',
  BUY_SERVICE = 'BUY_SERVICE',
  IMPORT_ASSET = 'IMPORT_ASSET',
  IMPORTING_REQUEST = 'IMPORTING_REQUEST',
  LIQUIDATE_FEE = 'LIQUIDATE_FEE',
  MAINTENANCE_ASSET = 'MAINTENANCE_ASSET',
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  REVENUE_LIQUIDATE = 'REVENUE_LIQUIDATE'
}
export const ActionTypeEnumValue: string[] = ['IMPORT_PRODUCT', 'BUY_SERVICE', 'IMPORT_ASSET', 'IMPORTING_REQUEST','LIQUIDATE_FEE', 'MAINTENANCE_ASSET','PURCHASE_ORDER', 'REVENUE_LIQUIDATE'];