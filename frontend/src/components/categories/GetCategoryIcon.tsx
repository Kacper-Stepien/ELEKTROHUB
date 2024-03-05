import { FaCamera, FaLaptop, FaTv } from "react-icons/fa";

import { IoGameController } from "react-icons/io5";
import { MdOutlineSmartphone } from "react-icons/md";

const getCategoryIcon = (categoryName: string) => {
  const lowercaseName = categoryName.toLowerCase();
  if (lowercaseName.includes("tv") || lowercaseName.includes("telewizor")) {
    return <FaTv />;
  } else if (lowercaseName.includes("laptop")) {
    return <FaLaptop />;
  } else if (
    lowercaseName.includes("smartphone") ||
    lowercaseName.includes("telefon") ||
    lowercaseName.includes("smartfon")
  ) {
    return <MdOutlineSmartphone />;
  } else if (lowercaseName.includes("kamera")) {
    return <FaCamera />;
  } else if (lowercaseName.includes("game") || lowercaseName.includes("gra")) {
    return <IoGameController />;
  } else {
    return undefined;
  }
};

export { getCategoryIcon };
