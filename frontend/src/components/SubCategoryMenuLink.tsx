import { FC } from "react";

interface SubCategoryMenuLinkProps {
  text: string;
  icon?: JSX.Element;
}

const SubCategoryMenuLink: FC<SubCategoryMenuLinkProps> = ({ text, icon }) => {
  return (
    <li className="flex items-center gap-2 px-4 py-1 font-bold transition hover:cursor-pointer hover:underline md:py-2">
      {icon}
      {text}
    </li>
  );
};

export default SubCategoryMenuLink;
