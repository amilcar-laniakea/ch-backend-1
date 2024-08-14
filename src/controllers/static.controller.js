const { getAllProducts, getProductById } = require("../services/product.service.js");
const { getCartById } = require("../services/cart.service.js");

class ProductStaticController {
  constructor() {
    this.products = [];
  }

  async renderProducts(req, res) {
    let result = {};

    try {
      const limit = parseInt(req.query.limit) || 5;
      const page = parseInt(req.query.page) || 1;
      const category = req.query.category || "";
      const status = req.query.status || "";
      const name = req.query.name || "";
      const stock = req.query.stock || "";
      const code = parseInt(req.query.code) || null;
      const sort = req.query.sort || "";

      this.products = await getAllProducts(
        page,
        limit,
        category,
        status,
        name,
        stock,
        code,
        sort
      );

      this.products.prevLink = this.products.hasPrevPage
        ? `${process.env.APP_URL}views/products?page=${this.products.prevPage}&name=${name}&code=${code}&code=${code}&stock=${stock}&status=${status}&category=${category}&limit=${limit}&sort=${sort}`
        : "";
      this.products.nextLink = this.products.hasNextPage
        ? `${process.env.APP_URL}views/products?page=${this.products.nextPage}&name=${name}&code=${code}&code=${code}&stock=${stock}&status=${status}&category=${category}&limit=${limit}&sort=${sort}`
        : "";
      this.products.isValid = !(page <= 0 || page > this.products.totalPages);

      result = {
        ...this.products,
        pages: Array.from({ length: this.products.totalPages }, (_, i) => ({
          page: i + 1,
          current: i + 1 === page,
        })),
      };
    } catch {
    } finally {
      res.render("products", result);
    }
  }

  async renderProductById(req, res) {
    let result = { isValid: false };

    try {
      const id = req.params.pid;

      const product = await getProductById(id);

      result = { ...product._doc, isValid: true };

    } catch {} finally {
      res.render("detailProduct", result);
    }
  }

  async renderCartById(req, res) {
    let result = {};

    try {
      const id = req.query.id;

      result = await getCartById(id, true);

       console.log('result', result);

    } catch {} finally {
      res.render("cart", result);
    }
  }
}

module.exports = ProductStaticController;
