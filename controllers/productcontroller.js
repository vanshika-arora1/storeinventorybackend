const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product Deleted" });
};

exports.searchProduct = async (req, res) => {
  const name = req.query.name;

  const products = await Product.find({
    productName: { $regex: name, $options: "i" }
  });

  res.json(products);
};

exports.filterCategory = async (req, res) => {
  const cat = req.query.cat;

  const products = await Product.find({ category: cat });

  res.json(products);
};