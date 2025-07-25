import { Queue } from "bullmq";
import IORedis from "ioredis";

export const redisClient = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
  process.exit(1);
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Redis");
});

export const dbSync = new Queue("db-sync", {
  connection: redisClient,
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  },
});
