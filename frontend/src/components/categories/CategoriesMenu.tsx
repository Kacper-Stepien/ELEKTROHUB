import CategoryMenuLink from "./CategoryMenuLink";
import { getCategoryIcon } from "./GetCategoryIcon";
import { getCategories } from "../../api/categoriesApi";
import { useEffect, useState } from "react";
import { Category } from "../../types/Category.interface";
import SubCategoryMenuLink from "./SubCategoryMenuLink";
import MenuLink from "./MenuLink";

const CategoriesMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const topLevelCategories = categories.filter(
    (category) => !category.parentCategory,
  );

  const handleCategoryHover = (category: Category | null) => {
    setHoveredCategory(category);
  };

  const closeMenu = () => {
    setHoveredCategory(null);
  };

  const downloadCategories = async () => {
    const data = await getCategories();
    if (data.success) {
      setCategories(data.data);
    }
  };
  useEffect(() => {
    downloadCategories();
  }, []);

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
