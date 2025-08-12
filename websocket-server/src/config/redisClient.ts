import { createClient } from "redis";

export const redisSubscriber = createClient({
  url: process.env.REDIS_URL,
});

redisSubscriber.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
  process.exit(1);
});

export async function initRedis() {
  if (!redisSubscriber.isOpen) {
    await redisSubscriber.connect();
    console.log("✅ Redis subscriber connected");
  }
}
