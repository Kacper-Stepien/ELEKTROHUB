import { FaHeart, FaShoppingCart } from "react-icons/fa";

import ProfileButton from "./ProfileButton";
import SwitchThemeButton from "./SwitchThemeButton";

const NavbarMenu = () => {
  return (
    <div className="flex items-center justify-between gap-16 max-w-xl w-full">
      <div className="flex gap-4 text-sm">
        <button className="btn btn-outline-secondary text-blue-950 dark:text-blue-100 text-md flex flex-col items-center hover:scale-110 transition-all">
          <FaShoppingCart className="" />
          <p>Koszyk</p>
        </button>
        <button className="btn btn-outline-secondary text-blue-950 dark:text-blue-100 text-md flex flex-col items-center hover:scale-110 transition-all">
          <FaHeart className="" />
          <p>Ulubione</p>
        </button>
      </div>

      <ProfileButton />

      <SwitchThemeButton />
    </div>
  );
};

export default NavbarMenu;
