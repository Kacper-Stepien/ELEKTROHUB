import { Address } from "./Address.interface";
import { UserBase } from "./UserBase.interface";

export interface UserState extends UserBase {
  _id: string;
  isAdmin: boolean;
  createdAt?: Date;
  address?: Address;
}
