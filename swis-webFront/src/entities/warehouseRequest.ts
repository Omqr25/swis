import lng from "./lng";

export interface location {
  longitude?: number;
  latitude?: number;
}
export default interface WarehouseRequest {
  id?: number;
  name?: lng;
  capacity?: number;
  branch_id?: number;
  location?: location;
  parent_id?: number | null;
  user_id?: number;
  is_Distribution_point?: boolean;
  _method?: string;
}
