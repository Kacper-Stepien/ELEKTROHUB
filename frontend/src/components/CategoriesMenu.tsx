import { FaCamera, FaLaptop, FaTv } from "react-icons/fa";

import CategoryMenuLink from "./CategoryMenuLink";
import { IoGameController } from "react-icons/io5";
import { MdOutlineSmartphone } from "react-icons/md";

const CategoriesMenu = () => {
  return (
    <div className=" bg-blue-600 text-blue-100 px-4 md:px-6">
      <ul className="flex gap-12 text-md 3xl:text-lg">
        <CategoryMenuLink text="AGD" icon={<FaTv />} />
        <CategoryMenuLink text="Komputery i laptopy" icon={<FaLaptop />} />
        <CategoryMenuLink
          text="Smartfony i zegarki"
          icon={<MdOutlineSmartphone />}
        />
        <CategoryMenuLink text="Foto i kamery" icon={<FaCamera />} />
        <CategoryMenuLink text="Gaming" icon={<IoGameController />} />
      </ul>
    </div>
  );
};

export default CategoriesMenu;
