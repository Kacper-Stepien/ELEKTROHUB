import { FC } from "react";

interface MenuLinkProps {
  text: string;
  icon?: JSX.Element;
}

const MenuLink: FC<MenuLinkProps> = ({ text, icon }) => {
  return (
    <li className="flex items-center gap-2 px-4 py-1 transition hover:cursor-pointer hover:underline md:py-2">
      {icon}
      {text}
    </li>
  );
};

export default MenuLink;
