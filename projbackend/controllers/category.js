const Category = require("../models/category");

exports.getCategoryById = async (req, res, next, id) => {
  const category = await Category.findById(id);
  if (!category) {
    return res.status(400).json({
      error: "category not found in DB",
      success: false,
    });
  }
  req.category = category;
  next();
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  const result = await category.save();
  if (!result) {
    return res.status(400).json({
      error: "Not able to save category in DB",
      success: false,
    });
  }

  res.json({
    category: result,
    success: true,
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    return res.status(400).json({
      error: "NO category found",
    });
  }
  res.json(categories);
};

exports.updateCategory = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  const result = await category.save();
  if (!result) {
    return res.status(400).json({
      error: "Not able to save category in DB",
      success: false,
    });
  }

  res.json({
    category: result,
    success: true,
  });
};

exports.removeCategory = async (req, res) => {
  const category = req.category;
  const name = category.name;
  console.log(category);
  const result = await category.deleteOne();
  console.log(`${name} has been deleted`);

  if (!result) {
    return res.status(400).json({
      error: "failed to delete category",
      success: false,
    });
  }

  res.json({
    message: `${category.name} has been Successfully deleted`,
    success: true,
  });
};
