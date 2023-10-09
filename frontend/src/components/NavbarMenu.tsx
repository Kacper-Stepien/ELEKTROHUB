import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
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
      <div className="text-xs dark:text-blue-100 flex items-center gap-2 hover:cursor-pointer group">
        <div>
          <p className="font-bold text-sm">Moje konto</p>
          <div className="col-start-1">Zaloguj/Zarejestruj</div>
        </div>
        <MdOutlineKeyboardArrowDown className="text-2xl group-hover:scale-110 group-hover:translate-x-4 transition-all" />
      </div>
      <SwitchThemeButton />
    </div>
  );
};

export default NavbarMenu;
