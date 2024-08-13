import lng from "./lng";

export interface Main_Branch {
  id?: number;
  name?: string;
}
export default interface Branches {
  id?: number;
  name?: string;
  code?: string;
  main_branch?: Main_Branch;
  phone?: string;
  address?: string;
}

export interface BranchSearch {
  id?: number;
  name?: lng;
  code?: string;
  main_branch?: Main_Branch;
  phone?: string;
  address?: lng;
}
