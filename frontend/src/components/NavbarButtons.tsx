import CartButton from "./CartButton/CartButton";
import FavouriteButton from "./FavouriteButton/FavouriteButton";

const NavbarButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <CartButton />
      <FavouriteButton />
    </div>
  );
};

export default NavbarButtons;
