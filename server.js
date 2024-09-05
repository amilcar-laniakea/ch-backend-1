const { app, PORT } = require("./src/app.js");
const log = require("./src/utils/logger.js");

app.listen(PORT, () => log.info(`Server running on port  ${PORT}!`));
