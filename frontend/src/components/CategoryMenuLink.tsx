import { FC } from "react";

interface CategoryMenuLinkProps {
  text: string;
  icon: JSX.Element;
}

const CategoryMenuLink: FC<CategoryMenuLinkProps> = ({ text, icon }) => {
  return (
    <li className="flex items-center gap-2 hover:cursor-pointer py-1 md:py-2 px-4 hover:bg-blue-500 transition ">
      {icon}
      {text}
    </li>
  );
};

export default CategoryMenuLink;
