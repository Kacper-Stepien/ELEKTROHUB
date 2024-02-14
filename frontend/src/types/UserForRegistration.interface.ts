import { UserBase } from "./UserBase.interface";

export interface UserForRegistration extends UserBase {
  password: string;
}
