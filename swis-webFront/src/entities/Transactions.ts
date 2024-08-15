import lng from "./lng";

export interface details {
  item?: string;
  quantity?: number;
}

export default interface Transaction {
  id?: number;
  user?: string;
  is_convoy?: boolean;
  notes?: string;
  code?: string;
  status?: string;
  date?: string;
  transaction_type?: string;
  transaction_mode_type?: string;
  waybill_num?: number;
  waybill_img?: string;
  qr_code?: string;
  CTN?: number;
  details: details[];
}

export interface TransactionSearch {
  id?: number;
  user_id?: string;
  is_convoy?: boolean;
  notes?: lng;
  code?: string;
  status?: string;
  date?: string;
  transaction_type?: string;
  transaction_mode_type?: string;
  waybill_num?: number;
  waybill_img?: string;
  qr_code?: string;
  CTN?: number;
  details: details[];
}

export interface TransactionItemRequest {
  warehouse_id?: number;
  item_id?: number;
  quantity?: number;
}

export interface TransactionDriverRequest {
  driver_id?: number;
}

export interface TransactionRequest {
  user_id?: number;
  notes?: lng;
  code?: string;
  status?: number;
  date?: string;
  waybill_num?: number;
  waybill_img?: File;
  is_convoy?: string;
  transaction_type?: string;
  type?: string;
  items?: TransactionItemRequest[];
  drivers?: TransactionDriverRequest[];
  CTN?: string;
}
