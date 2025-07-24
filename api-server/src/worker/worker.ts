import { Worker } from "bullmq";
import { redisClient } from "../utils/redis";
import prisma from "../utils/db";
import logger from "../utils/logger";
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

        default:
          console.warn(`Unknown job type: ${job.name}`);
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
