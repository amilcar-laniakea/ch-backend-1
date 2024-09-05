const mongoose = require("mongoose");
const log = require("../utils/logger");

const db = mongoose.connection;

const dbConnect = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGO_DB_URI}${process.env.DATABASE_NAME}`,
      {}
    );
    log.info("success: connected to database!");
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
};

const dbError = db.on("error", (err) => {
  log.error(err);
});

module.exports = { dbConnect, dbError };
