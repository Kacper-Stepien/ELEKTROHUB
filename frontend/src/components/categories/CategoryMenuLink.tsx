import { FC } from "react";
import { NavLink } from "react-router-dom";

interface CategoryMenuLinkProps {
  name: string;
  path: string;
  active: boolean;
  onClick?: () => void;
  icon?: JSX.Element;
}

const CategoryMenuLink: FC<CategoryMenuLinkProps> = ({
  name,
  path,
  active,
  onClick,
  icon,
}) => {
  return (
    <NavLink
      to={`/${path}`}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-tl rounded-tr  px-6 py-1 hover:cursor-pointer ${active ? "bg-gray-200 text-blue-900 dark:bg-blue-50" : ""} md:py-2`}
    >
      {icon}
      {name.toUpperCase()}
    </NavLink>
  );
};

export default CategoryMenuLink;
