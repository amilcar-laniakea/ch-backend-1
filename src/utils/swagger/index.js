const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const log = require("../logger");
const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const definitionPath = path.resolve(__dirname, "./definition.yaml");
const definition = yaml.load(fs.readFileSync(definitionPath, "utf8"));

if (process.env.NODE_ENV === "production") {
  definition.servers = [
    { url: "https://backend-final-project.amilcarcode.app" },
  ];
} else {
  definition.servers = [{ url: "http://localhost:8080" }];
}

const options = {
  definition,
  apis: ["./src/product.router.js", "./src/cart.router.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { customCssUrl: "/css/swagger-ui.css" })
  );

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  log.info(`Docs available at ${port}/docs`);
}

module.exports = swaggerDocs;
