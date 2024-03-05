import { FC } from "react";
import { NavLink } from "react-router-dom";

interface SubCategoryMenuLinkProps {
  name: string;
  path: string;
  parentCategoryPath: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

const SubCategoryMenuLink: FC<SubCategoryMenuLinkProps> = ({
  name,
  path,
  parentCategoryPath,
  onClick,
  icon,
}) => {
  return (
    <NavLink
      to={`/${parentCategoryPath}/${path}`}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-1 font-bold transition hover:cursor-pointer hover:underline md:py-2"
    >
      {icon}
      {name}
    </NavLink>
  );
};

export default SubCategoryMenuLink;
