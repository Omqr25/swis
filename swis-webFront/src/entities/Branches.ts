export interface Main_Branch{
    id? : number;
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
