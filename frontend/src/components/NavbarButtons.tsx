import { FaHeart, FaShoppingCart } from "react-icons/fa";

const NavbarButtons = () => {
  return (
    <div className="flex gap-4 items-center">
      <button className="btn btn-outline-secondary text-blue-950 dark:text-blue-100 text-xl flex flex-col items-center hover:scale-110 transition-all">
        <FaShoppingCart className="" />
        <p className="text-sm">Koszyk</p>
      </button>
      <button className="btn btn-outline-secondary text-blue-950 dark:text-blue-100 text-xl flex flex-col items-center hover:scale-110 transition-all">
        <FaHeart className="" />
        <p className="text-sm">Ulubione</p>
      </button>
    </div>
  );
};

export default NavbarButtons;
