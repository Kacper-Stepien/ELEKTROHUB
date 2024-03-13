import { FaHeart } from "react-icons/fa";
import CartButton from "./CartButton/CartButton";
import FloatingButton from "../ui/FloatingButton";

const NavbarButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <CartButton />

      <FloatingButton
        icon={<FaHeart className="" />}
        name="Ulubione"
        itemCount={1}
      >
        <h3 className="mb-4 text-lg font-semibold">Ulubione</h3>
      </FloatingButton>
    </div>
  );
};

export default NavbarButtons;
