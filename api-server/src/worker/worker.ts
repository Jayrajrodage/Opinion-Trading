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
          const data = job.data.order;
          const order = {
            id: data.id,
            eventId: data.eventId,
            userId: data.userId,
            side: data.side,
            orderType: data.orderType,
            matchedQuantity: data.matchedQuantity,
            price: data.price,
            quantity: data.quantity,
            status: data.status,
            tradeId: data.tradeId,
          };
          await prisma.order.upsert({
            create: order,
            update: order,
            where: { id: order.id },
          });
          break;
        case "fillsCreate":
          const fillData = job.data;
          const fill = {
            id: fillData.id,
            eventId: fillData.eventId,
            yesOrderId: fillData.yesOrderId,
            noOrderId: fillData.noOrderId,
            yesPrice: fillData.yesPrice,
            noPrice: fillData.noPrice,
            quantity: fillData.quantity,
          };
          await prisma.fill.create({
            data: fill,
          });
          break;
        case "tradeUpsert":
          const tradeData = job.data.trade;
          const trade = {
            id: tradeData.id,
            userId: tradeData.userId,
            eventId: tradeData.eventId,
            invested: tradeData.invested,
            return: tradeData.return,
            pnl: tradeData.pnl,
            status: tradeData.status,
          };
          await prisma.trade.upsert({
            create: trade,
            update: trade,
            where: { id: trade.id },
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
