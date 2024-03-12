import { CartProduct } from "./CartProduct.interface";

export interface CartState {
  products: CartProduct[];
  totalPrice: number;
}
