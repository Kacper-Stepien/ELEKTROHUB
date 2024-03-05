const Product = require("../models/Product");
const Category = require("../models/Category");
const catchAsync = require("../utils/catchAsync");

// @desc     Create new product
// @route    POST /api/products
// @access   Private/Admin
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, category, description, attributes, price, stock } = req.body;

  // Valid data
  if (!name || !category || !description || !price || !stock) {
    return res.status(400).json({
      status: "error",
      message: "Niepełne dane",
    });
  }

  // Check if category exists
  if (!(await Category.findById(category))) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }

  // Check if attributes are in the correct format
  if (
    Array.isArray(attributes) &&
    attributes.every((attr) => attr.name && attr.value)
  ) {
    // Create product
    const product = await Product.create({
      name,
      category,
      description,
      attributes,
      price,
      stock,
    });

    return res.status(201).json({
      status: "success",
      product,
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "Nieprawidłowy format atrybutów",
    });
  }
});

// @desc     Update product
// @route    PUT /api/products/:id
// @access   Private/Admin
exports.updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produkt nie istnieje",
    });
  }

  const {
    name,
    category,
    description,
    attributes,
    price,
    stock,
    onSale,
    salePrice,
  } = req.body;

  // Valid data
  if (!name || !category || !description || !price || !stock) {
    return res.status(400).json({
      status: "error",
      message: "Niepełne dane",
    });
  }

  // Check if category exists
  const categoryExists = Category.findById(category);
  if (!categoryExists) {
    return res.status(400).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }

  // Check if attributes are in the correct format
  if (
    Array.isArray(attributes) &&
    attributes.every((attr) => attr.name && attr.value)
  ) {
    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        description,
        attributes,
        price,
        stock,
        onSale,
        salePrice,
      },
      { new: true }
    );
    return res.status(201).json({
      status: "success",
      updatedProduct,
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "Nieprawidłowy format atrybutów",
    });
  }
});

// @desc     Delete product
// @route    DELETE /api/products/:id
// @access   Private/Admin
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Check if product exists
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produkt nie istnieje",
    });
  }

  // Delete product
  await Product.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// @desc     Get product by id
// @route    GET /api/products/id/:id
// @access   Public
exports.getProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  // Check if product exists
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produkt nie istnieje",
    });
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

// @desc Get product by name
// @route GET /api/products/name/:name
// @access Public
exports.getProductByName = catchAsync(async (req, res, next) => {
  const name = req.params.name;
  const product = await Product.findOne({ name });
  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Produkt nie istnieje",
    });
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

// @desc     Get all products
// @route    GET /api/products
// @access   Public
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find()
    .skip(req.pagination.skip)
    .limit(req.pagination.limit)
    .sort(req.sort);
  res.status(200).json({
    status: "success",
    products,
  });
});

// @desc     Get products by category name
// @route    GET /api/products/category/:category
// @access   Public
exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 20;
  const skip = (page - 1) * perPage;

  // Check if category exists
  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return res.status(404).json({
      status: "error",
      message: "Kategoria nie istnieje",
    });
  }
  const categoryWithDescendantsCategories =
    await getAllDescendantsCategoriesIDs(categoryExists._id);
  const products = await Product.find({
    category: { $in: categoryWithDescendantsCategories },
  })
    .skip(skip)
    .limit(perPage)
    .sort(req.sort);

  const totalProducts = await Product.countDocuments({
    category: { $in: categoryWithDescendantsCategories },
  });
  res.status(200).json({
    status: "success",
    products,
    totalProducts,
  });
});

async function getAllDescendantsCategoriesIDs(categoryId) {
  const category = await Category.findById(categoryId);
  let categoryIds = [category._id];

  if (category.subCategories.length > 0) {
    for (const subCategory of category.subCategories) {
      const subCategoryIds = await getAllDescendantsCategoriesIDs(
        subCategory._id
      );
      categoryIds = categoryIds.concat(subCategoryIds);
    }
  }
  return categoryIds;
}
