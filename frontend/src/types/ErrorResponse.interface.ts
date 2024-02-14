import { Response } from "./Response.interface";

export interface ErrorResponse extends Response {
  success: false;
}
