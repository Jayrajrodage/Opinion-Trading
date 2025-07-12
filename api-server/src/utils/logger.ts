// src/utils/logger.ts
import pino from "pino";
import dayjs from "dayjs";

const isProd = process.env.NODE_ENV === "production";

const logger = pino({
  level: isProd ? "info" : "debug",
  base: undefined,
  timestamp: () => `,"time":"${dayjs().format()}"`,
  transport: !isProd
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export default logger;
