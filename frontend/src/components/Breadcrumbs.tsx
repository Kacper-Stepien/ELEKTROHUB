import { useParams } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Breadcrumbs = () => {
  const { category, subcategory, subsubcategory } = useParams();
  return (
    <div className="flex items-center gap-4 ">
      <NavLink to="/">
        <IoHomeOutline />
      </NavLink>
      {category &&
        (subcategory ? (
          <NavLink to={`/${category}`} className="hover:underline">
            {category}
          </NavLink>
        ) : (
          <span className=" cursor-default text-gray-500 dark:text-gray-300">
            {category}
          </span>
        ))}
      {subcategory && (
        <>
          <FaAngleRight className="text-xs" />
          {subsubcategory ? (
            <NavLink
              to={`/${category}/${subcategory}`}
              className="hover:underline"
            >
              {subcategory}
            </NavLink>
          ) : (
            <span className=" cursor-default text-gray-500 dark:text-gray-300">
              {subcategory}
            </span>
          )}
        </>
      )}
      {subsubcategory && (
        <>
          <FaAngleRight className="text-xs" />
          <span className=" cursor-default text-gray-500 dark:text-gray-300">
            {subsubcategory}
          </span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
