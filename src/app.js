const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");

const db = require("./config/db.js");

const productsRouter = require("./routes/product.router.js");
const cartsRouter = require("./routes/cart.router.js");
const staticRouter = require("./routes/static.router.js");

const app = express();
const hbs = create({
  extname: "hbs",
  partialsDir: path.join(__dirname, "views", "partials"),
});
app.use(express.static(path.join(__dirname, "public")));

db.dbConnect();
db.dbError;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/product", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/views", staticRouter);

module.exports = app;