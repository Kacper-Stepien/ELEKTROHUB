import CategoryMenuLink from "./CategoryMenuLink";
import { getCategoryIcon } from "../utils/GetCategoryIcon";
import { getCategories } from "../api/categoriesApi";
import { useEffect, useState } from "react";
import { Category } from "../types/Category.interface";
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
    <div
      className="bg-gray-200 dark:bg-white"
      onMouseLeave={() => handleCategoryHover(null)}
    >
      <ul className="text-md flex gap-12 bg-blue-600 px-4  pt-1 text-blue-100 md:px-6 3xl:text-lg">
        {topLevelCategories.map((category) => (
          <li
            onMouseEnter={() => handleCategoryHover(category)}
            key={category._id}
          >
            <CategoryMenuLink
              text={category.name}
              active={category === hoveredCategory}
              icon={getCategoryIcon(category.name)}
            />
          </li>
        ))}
      </ul>
      {hoveredCategory && hoveredCategory.subCategories.length > 0 && (
        <div className="flex flex-wrap justify-between gap-6 p-4 py-8">
          {hoveredCategory.subCategories.map((subCategory) => (
            <div className="w-max " key={subCategory._id}>
              <SubCategoryMenuLink text={subCategory.name} />
              {subCategory.subCategories.map((subSubCategory) => (
                <MenuLink text={subSubCategory.name} key={subSubCategory._id} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
