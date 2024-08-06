import lng from "./lng";

export default interface Driver{
id? : number;
name? : string;
vehicle_number?: string;
phone? : string;
national_id? : string;
transportation_company_name? : string;
}

export interface DriverRequest{
    name? : lng;
    vehicle_number? : string;
    phone?: string;
    national_id? : string;
    transportation_company_name? : lng ;
}