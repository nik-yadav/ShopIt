const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");
const { Console } = require("console");

exports.getProductById = async (req, res, next, id) => {
  const product = await Product.findById(id).populate("category");
  if (!product) {
    return res.status(400).json({
      err: "Product not found",
    });
  }
  req.product = product;
  next();
  // .exec((err, product) => {
  //   if (err) {
  //     return res.status(400).json({
  //       err: "Product not found",
  //     });
  //   }
  //   req.product = product;
  //   next();
  // });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined; //Performance Optimisation
  return res.json(req.product);
};

// Middleware
exports.photo = (req, res) => {
  console.log("inside photo");
  if (req.product.photo) {
    return res.json({
      success: true,
      imageName: req.product.photo,
    });
    // res.set("Content-Type", req.product.photo.contentType);
    // return res.send(req.product.photo.data);
  }
  return res.json({
    success: "false",
  });
};

// Create
exports.createProduct = async (req, res) => {
  // const form = new formidable.IncomingForm();
  // form.keepExtensions = true;

  // form.parse(req, async (err, fields, file) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "problem with image",
  //     });
  //   }

  //   let convertedFields = {};

  //   for (const field in fields) {
  //     convertedFields[field] = fields[field][0];
  //   }

  // destructure the fields
  // req.body = JSON.parse(req.body);
  console.log(req.imageName);
  const { name, brand, description, price, category, stock } = req.body;
  if (
    !brand ||
    // !mrp ||
    !name ||
    !description ||
    !price ||
    !category ||
    !stock
  ) {
    return res.status(400).json({
      error: "Please include all fields",
    });
  }

  req.body.reviews = "0";

  // console.log(imageFile);
  // handle file image
  req.body.photo = req.imageName;

  let product = new Product(req.body);

  // save to the DB
  console.log(product);
  const result = await product.save();
  if (!result) {
    return res.status(400).json({
      error: "saving product in DB failed",
    });
  }
  res.json(product);
  // });
};

// Update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    // Updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to the DB
    const result = await product.save();
    if (!result) {
      return res.status(400).json({
        error: "Updation of product failed",
      });
    }
    res.json(product);
  });
};

// Delete
exports.deleteProduct = async (req, res) => {
  let product = req.product;

  const result = await product.deleteOne();

  // product.remove((err, deletedproduct) => {
  //   if (err) {
  //     return res.status(400).json({
  //       err: "Failed to delte the product",
  //     });
  //   }
  //   res.json({
  //     message: "Deleted successfully",
  //     deletedproduct,
  //   });
  // });

  if (!result) {
    return res.status(400).json({
      error: "failed to delete product",
      success: false,
    });
  }

  res.json({
    message: `${product.name} has been Successfully deleted`,
    success: true,
  });
};

// Product Listing
exports.getAllProducts = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  // if (req.query.limit === "all") limit = null;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  // const user = await User.findById(req.auth._id)
  let products;
  if (req.query.limit === "all")
    products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]]);
  else
    products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, "asc"]])
      .limit(limit);

  if (!products) {
    return res.status(400).json({
      err: "NO product found",
    });
  }
  res.json(products);
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        err: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        err: "Bulk operation failed",
      });
    }
    next();
  });
};
