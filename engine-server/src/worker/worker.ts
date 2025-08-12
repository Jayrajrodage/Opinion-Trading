import { Worker } from "bullmq";
import { redisClient } from "../utils/redis";
const ordersConsumer = new Worker(
  "order-consumer",
  async (job) => {
    try {
    } catch (error) {
      console.error("🚀 ~ ordersConsumer ~ error:", error);
      throw error;
    }
  },
  {
    connection: redisClient,
    concurrency: 1,
  }
);
ordersConsumer.on("ready", () => {
  console.log("dbSync Worker is ready");
});

ordersConsumer.on("failed", (job, err) => {
  console.error(`Job failed: ${job}, Error: ${err.message}`);
});

ordersConsumer.on("error", (err) => {
  console.error({ err }, "Worker error:");
});
