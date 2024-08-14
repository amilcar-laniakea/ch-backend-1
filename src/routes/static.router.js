const express = require("express");
const router = express.Router();

const ProductActions = require("../controllers/static.controller.js");

const Product = new ProductActions();

router.get("/products", async (req, res) => Product.renderProducts(req, res));
router.get("/product-detail/:pid", async (req, res) => Product.renderProductById(req, res));
router.get("/cart", async (req, res) => Product.renderCartById(req, res));

module.exports = router;