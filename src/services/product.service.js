const Product = require("../models/product.model");
const isValidObjectId = require("../utils/isValidObjectId.js");
const { productErrorCodes } = require("../constants/product.constants.js")
const isBooleanString = require("../utils/isBooleanString.js");

const getAllProducts = async (page, limit, category, status, name, stock, code, sort) => {
  const query = {};
  let sortOption = {};

  if(name) query.name = { $regex: name, $options: "i" };
  if(category) query.category = category;
  if(status) query.status = status;
  if(code) query.code = { $eq: code };

  const validSortOrders = ['asc', 'desc'];

  if (validSortOrders.includes(sort)) {
    const sortValue = sort === 'desc' ? -1 : 1;
    sortOption = { price: sortValue };
  }

  if(isBooleanString(stock) === true) query.stock = { $gt: 1 };
  else if(isBooleanString(stock) === false) query.stock = { $eq: 0 };

  const products = await Product.paginate(query, { page, limit, sort: sortOption, lean: true });

  if (products.totalDocs === 0) 
    throw new Error(productErrorCodes.NOT_FOUND);

  return products;
};

const getProductById = async (id) => {
  if (!isValidObjectId(id) && isNaN(Number(id))) 
    throw new Error(productErrorCodes.INVALID_FORMAT);

  const product = await ( !isNaN(id) ? Product.findOne({ code: id}) : Product.findById(id));

  if (!product) 
    throw new Error(productErrorCodes.NOT_FOUND);

  return product;
};

const createProduct = async (data) => {
  const productRequest = new Product(data);
  const product = await productRequest.save();

  if (!product) {
    throw new Error(productErrorCodes.UNEXPECTED_ERROR);
  }

  return product;
};

const updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data);

  if (!product) {
    throw new Error(productErrorCodes.NOT_FOUND);
  }

  return product;
}

const deleteProduct = async (id) => {
  if (!isValidObjectId(id) && isNaN(Number(id))) {
    throw new Error(productErrorCodes.INVALID_FORMAT);
  }
  
  const product = await ( !isNaN(id) ? Product.deleteOne({ code: id }) : Product.findByIdAndDelete(id));

  if (!product) {
    throw new Error(productErrorCodes.NOT_FOUND);
  }

  return product;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};