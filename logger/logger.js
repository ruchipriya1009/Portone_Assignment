const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors } = format;
const path = require("path");

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Directory for log files
const logDir = path.join(__dirname, "..", "logs");

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new transports.File({ filename: path.join(logDir, "combined.log") }),
  ],
});

module.exports = logger;
