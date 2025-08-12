import cron from "node-cron";
import { JsonDB, Config } from "node-json-db";
import { trade } from "../store/trade";
import { UserBalanceStore } from "../store/userBalance";

const backupDb = new JsonDB(new Config("backup", true, false, "/"));

cron.schedule("*/15 * * * *", async () => {
  try {
    // Get latest state
    const trades = trade.getAllTrades();
    const balances = UserBalanceStore.getAllBalance();
    const orders = trade.getAllOrders();

    // Replace old data with new data
    await backupDb.push("/trades", trades, true);
    await backupDb.push("/balances", balances, true);
    await backupDb.push("/orders", orders, true);

    console.log("✅ State saved successfully.");
  } catch (err) {
    console.error("❌ Failed to save state:", err);
  }
});

cron.schedule("*/10 * * * *", () => {
  const trades = trade.getAllTrades();
  const orders = trade.getAllOrders();
});
