import { FC } from "react";
import { NavLink } from "react-router-dom";

interface MenuLinkProps {
  name: string;
  path: string;
  parentCategoryPath: string;
  grandparentCategoryPath: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

const MenuLink: FC<MenuLinkProps> = ({
  name,
  path,
  parentCategoryPath,
  grandparentCategoryPath,
  onClick,
  icon,
}) => {
  return (
    <NavLink
      to={`/${grandparentCategoryPath}/${parentCategoryPath}/${path}`}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-1 transition hover:cursor-pointer hover:underline md:py-2"
    >
      {icon}
      {name}
    </NavLink>
  );
};

export default MenuLink;
