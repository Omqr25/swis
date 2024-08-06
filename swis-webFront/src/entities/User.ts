import lng from "./lng";

export default interface User {
  id?: number;
  name?: string;
  phone?: string;
  password?: string;
  email?: string;
  code?: string;
  type?: string;
  access_token?: string;
  contact_email?: string;
  photo?: string;
}

export interface UserRequest {
  name?: lng;
  phone?: string;
  password?: string;
  email?: string;
  type?: number;
  contact_email?: string;
  photo?: File;
}