import { Address } from "./Address";

export interface UserState {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  createdAt?: Date;
  address?: Address;
}
