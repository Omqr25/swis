import item from "./items";

export interface City {
  id: number;
  name: string;
}

export interface Location {
  type: string;
  coordinates: number[];
}
export default interface Warehouse {
  id?: number;
  name?: string;
  code?: string;
  branch?: City;
  location?: Location;
  Free_capacity?: number;
  main_Warehouse?: City;
  keeper?: string;
  items?: item[];
}

export interface WarehouseForKeeper{
  "warehouse id"? : number;
  name?: string;
  items?: item[];
}
