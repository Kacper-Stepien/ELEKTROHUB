import CategoryMenuLink from "./CategoryMenuLink";
import { getCategoryIcon } from "./GetCategoryIcon";
import { getCategories } from "../../api/categoriesApi";
import { useState } from "react";
import { Category } from "../../types/Category.interface";
import SubCategoryMenuLink from "./SubCategoryMenuLink";
import MenuLink from "./MenuLink";
import { useQuery } from "@tanstack/react-query";

const CategoriesMenu = () => {
  const {
    isLoading,
    isError,
    data: categories,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const topLevelCategories = categories
    ? categories.filter((category) => !category.parentCategory)
    : [];

  const handleCategoryHover = (category: Category | null) => {
    setHoveredCategory(category);
  };

  const closeMenu = () => {
    setHoveredCategory(null);
  };

  if (isError) {
    return <div>Wystąpił błąd: {error.message}</div>;
  }

  if (isLoading || isFetching) {
    return (
      <div className="text-md flex  bg-blue-600 px-4  py-2 text-blue-100 md:px-6 3xl:text-lg">
        Pobieranie kategorii...
      </div>
    );
  }

  return (
    <div className="bg-gray-200 dark:bg-blue-50" onMouseLeave={closeMenu}>
      <ul className="text-md flex  bg-blue-600 px-4  pt-2 text-blue-100 md:px-6 3xl:text-lg">
        {topLevelCategories.map((category) => (
          <li
            onMouseEnter={() => handleCategoryHover(category)}
            key={category._id}
          >
            <CategoryMenuLink
              name={category.name}
              path={category.name}
              onClick={closeMenu}
              active={category === hoveredCategory}
              icon={getCategoryIcon(category.name)}
            />
          </li>
        ))}
      </ul>
      {hoveredCategory && hoveredCategory.subCategories.length > 0 && (
        <div className="z-100 absolute left-0 right-0 flex flex-wrap gap-6 bg-gray-200 p-4 py-8 text-primaryDark  dark:bg-blue-50">
          {hoveredCategory.subCategories.map((subCategory) => (
            <div className="w-max " key={subCategory._id}>
              <SubCategoryMenuLink
                name={subCategory.name}
                path={subCategory.name}
                parentCategoryPath={hoveredCategory.name}
                onClick={closeMenu}
              />
              {subCategory.subCategories.map((subSubCategory) => (
                <MenuLink
                  name={subSubCategory.name}
                  path={subSubCategory.name}
                  parentCategoryPath={subCategory.name}
                  grandparentCategoryPath={hoveredCategory.name}
                  onClick={closeMenu}
                  key={subSubCategory._id}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
