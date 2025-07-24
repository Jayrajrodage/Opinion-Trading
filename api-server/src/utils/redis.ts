import IORedis from "ioredis";
import logger from "./logger";

const redisUrl = process.env.REDIS_URL;

export const redisClient = new IORedis(redisUrl as string, {
  maxRetriesPerRequest: null,
});

redisClient.on("error", (err) => {
  logger.error({ err }, "Redis connection error");
  process.exit(1);
});

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});
