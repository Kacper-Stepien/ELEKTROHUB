import { FaShoppingCart } from "react-icons/fa";
import { useAppSelector } from "../../store/store";

import FloatingButton from "../../ui/FloatingButton";
import CartItemsList from "./CartItemsList";
import PrimaryButton from "../../ui/PrimaryButtont";
import Title from "./Title";
import TotalPrice from "./TotalPrice";

const CartButton = () => {
  const cart = useAppSelector((state) => state.cart);
  const numberOfCartItems = cart.products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <FloatingButton
      icon={<FaShoppingCart />}
      name="Koszyk"
      itemCount={numberOfCartItems}
    >
      <Title numberOfCartItems={numberOfCartItems} />
      <CartItemsList cart={cart} />
      <TotalPrice totalPrice={+cart.totalPrice.toFixed(2)} />
      <PrimaryButton type="button" onClick={() => {}}>
        <span className="text-sm">Przejdź do koszyka</span>
      </PrimaryButton>
    </FloatingButton>
  );
};

export default CartButton;
