import lng from "./lng";

export default interface BranchesRequest {
  id?: number;
  name?: lng;
  code?: string;
  parent_id?: number | null;
  phone?: string;
  address?: lng;
  _method?: string;
}
