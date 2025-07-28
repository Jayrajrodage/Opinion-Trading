import { Worker } from "bullmq";
import { redisClient } from "../utils/redis";
import prisma from "../utils/db";
import logger from "../utils/logger";
import { Order } from "../generated/prisma";
const dbSync = new Worker(
  "db-sync",
  async (job) => {
    try {
      switch (job.name) {
        case "userBalance":
          await prisma.user.update({
            where: { id: job.data.userId },
            data: {
              availableBalance: job.data.availableBalance,
              lockedBalance: job.data.lockedBalance,
            },
          });
          break;
        case "orderUpsert":
          const order = job.data.order as Order;
          await prisma.order.upsert({
            create: order,
            update: order,
            where: { id: order.id },
          });
          break;
        default:
          logger.warn(`Unknown job type: ${job.name}`);
          break;
      }
    } catch (error) {
      logger.info({ error }, "🚀 ~ balanceDbWorker ~ error:");
      throw error;
    }
  },
  {
    connection: redisClient,
    concurrency: 1,
  }
);
dbSync.on("ready", () => {
  logger.info("dbSync Worker is ready");
});

dbSync.on("failed", (job, err) => {
  logger.error(`Job failed: ${job}, Error: ${err.message}`);
});

dbSync.on("error", (err) => {
  logger.error({ err }, "Worker error:");
});
