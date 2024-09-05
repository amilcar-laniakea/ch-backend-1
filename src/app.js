const express = require("express");
const path = require("path");
const { create } = require("express-handlebars");
const swaggerDocs = require("./utils/swagger/index.js");

const db = require("./config/db.js");

const productsRouter = require("./routes/product.router.js");
const cartsRouter = require("./routes/cart.router.js");
const staticRouter = require("./routes/static.router.js");
const homeRouter = require("./routes/home.router.js");

const PORT = process.env.PORT || 8080;

const app = express();
const hbs = create({
  extname: "hbs",
  partialsDir: path.join(__dirname, "views", "partials"),
});

app.use("/", homeRouter);

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

swaggerDocs(app, PORT);

module.exports = { app, PORT };
