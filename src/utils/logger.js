const logger = require("pino");
const dayjs = require("dayjs");
const pinoPretty = require("pino-pretty");

const log = logger(
  {
    base: { pid: false },
    timestamp: () => `,"time":"${dayjs().format("YYYY-MM-DDTHH:mm:ssZ[Z]")}"`,
  },
  pinoPretty({
    colorize: true,
  })
);

module.exports = log;
