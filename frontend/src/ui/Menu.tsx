import { FaCamera, FaLaptop, FaTv } from "react-icons/fa";

import { IoGameController } from "react-icons/io5";
import { MdOutlineSmartphone } from "react-icons/md";

const Menu = () => {
  return (
    <div className=" bg-blue-600 text-blue-100  px-4 md:px-6 ">
      <ul className="flex gap-12 text-md 3xl:text-lg">
        <li className="flex items-center gap-2 hover:cursor-pointer py-2 md:py-4 px-4 hover:bg-blue-500 transition ">
          <FaTv />
          Tv, Audio i RTV
        </li>
        <li className="flex items-center gap-2 hover:cursor-pointer py-2 md:py-4 px-4 hover:bg-blue-500 transition h-full">
          <FaLaptop />
          Komputery i laptopy
        </li>
        <li className="flex items-center gap-2 hover:cursor-pointer py-2 md:py-4 px-4 hover:bg-blue-500 transition h-full">
          <MdOutlineSmartphone />
          Smartfony i zegarki
        </li>
        <li className="flex items-center gap-2 hover:cursor-pointer py-2 md:py-4 px-4 hover:bg-blue-500 transition h-full">
          <FaCamera />
          Foto i kamery
        </li>
        <li className="flex items-center gap-2 hover:cursor-pointer py-2 md:py-4 px-4 hover:bg-blue-500 transition h-full">
          <IoGameController />
          Gaming
        </li>
      </ul>
    </div>
  );
};

export default Menu;
