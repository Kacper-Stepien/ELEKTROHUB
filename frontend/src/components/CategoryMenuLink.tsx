import { FC } from "react";
import { NavLink } from "react-router-dom";

interface CategoryMenuLinkProps {
  text: string;
  active: boolean;
  icon?: JSX.Element;
}

const CategoryMenuLink: FC<CategoryMenuLinkProps> = ({
  text,
  active,
  icon,
}) => {
  return (
    <NavLink
      to={`/category/${text}`}
      className={`flex items-center gap-2 rounded-tl rounded-tr  px-4 py-1  hover:cursor-pointer ${active ? "bg-gray-200 text-blue-900 dark:bg-white" : ""} md:py-2`}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default CategoryMenuLink;
