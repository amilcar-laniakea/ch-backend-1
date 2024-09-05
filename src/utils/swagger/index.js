const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const log = require("../logger");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const definitionPath = path.resolve(__dirname, "./definition.yaml");
const definition = yaml.load(fs.readFileSync(definitionPath, "utf8"));

const options = {
  definition,
  apis: ["./src/product.router.js", "./src/cart.router.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at ${port}/docs`);
}

module.exports = swaggerDocs;
