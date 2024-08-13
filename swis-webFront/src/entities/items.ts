import lng from "./lng";

export default interface item {
  id?: number;
  name?: string;
  quantity?: number;
  code?: string;
  sectorType?: string;
  unitType?: string;
  size?: number;
  weight?: number;
  "quantity in the system"?: number;
}
export interface itemSearch {
  id?: number;
  name?: lng;
  quantity?: number;
  code?: string;
  sectorType?: string;
  unitType?: string;
  size?: number;
  weight?: number;
  "quantity in the system"?: number;
}

export interface itemRequest {
  name?: lng;
  quantity?: number;
  code?: string;
  sectorType?: string;
  unitType?: string;
  size?: number;
  weight?: number;
}
