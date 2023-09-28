const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

// @desc     Add new category
// @route    POST /api/categories
// @access   Private/Admin
exports.createCategory = catchAsync(async (req, res, next) => {
  const { name, description, parentCategory } = req.body;

  // Valid name and description
  if (!name || !description) {
    return res.status(400).json({
      status: "error",
      message: "Nazwa i opis kategorii są wymagane",
    });
  }

  // Valid parent category
  const parent = await Category.findById(parentCategory);
  if (!parent && parentCategory) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nadrzędna nie istnieje",
    });
  }

  // Check if category already exists
  const category = await Category.findOne({ name });
  if (category) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria o takiej nazwie już istnieje",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Create new category
    const newCategory = await Category.create(
      [
        {
          name,
          description,
          parentCategory: parentCategory ? parentCategory : undefined,
        },
      ],
      { session }
    );

    // Add new category to parent category subcategories
    if (parentCategory) {
      parent.subCategories.push(newCategory[0]._id);
      await parent.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    console.log(`✅ Category ${name} has been created`);

    return res.status(201).json({
      status: "success",
      data: {
        category: newCategory,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(`🔴 Error: ${error.message}`);

    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Check if category exists
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if there are products that belong to this category
    const products = await Product.find({ category: id });
    if (products.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Nie można usunąć kategorii, która zawiera produkty",
      });
    }

    // Check if there are subcategories that belong to this category
    const subCategories = await Category.find({ parentCategory: id });
    if (subCategories.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Nie można usunąć kategorii, która zawiera podkategorie",
      });
    }

    // Delete category
    await Category.findByIdAndDelete(id, { session });

    // Delete category from parent category subcategories
    parentCategory = await Category.findById(category.parentCategory);
    if (parentCategory) {
      parentCategory.subCategories = parentCategory.subCategories.filter(
        (subCategory) => subCategory != id
      );
      await parentCategory.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;

  // Check if category exists
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }

  if (name) {
    category.name = name;
  }
  if (description) {
    category.description = description;
  }
  await category.save();

  console.log(`✅ Category ${category.name} has been updated`);
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

// @desc    Get category by id
// @route   GET /api/categories/:id
// @access  Public
exports.getCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Check if category exists
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

// @desc     Get all categories
// @route    GET /api/categories
// @access   Public
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categoryTree = await buildCategoryTree();

  res.status(200).json({
    status: "success",
    data: {
      categories: categoryTree,
    },
  });
});

const buildCategoryTree = async (parentId = null) => {
  // Find all categories with parentCategory equal to parentId
  const categories = await Category.find({ parentCategory: parentId }).lean();

  // For each category, find its subcategories
  for (let i = 0; i < categories.length; i++) {
    categories[i].subCategories = await buildCategoryTree(categories[i]._id);
  }

  return categories;
};
