export interface location{
  longitude?: number;
  latitude?: number;
}
export default interface Warehouse2 {
    id?: number;
    name?: string;
    capacity?: number;
    branch_id?: number;
    location?: location;
    parent_id?: number;
    user_id?: number;
    is_Distribution_point?: boolean;
    _method? : string;
  }
  