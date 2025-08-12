import cron from "node-cron";
import { trade } from "../store/trade";

cron.schedule("*/10 * * * *", () => {
  // Get current state
  const tradesByEvent = trade.getAllTrades();
  const ordersByEvent = trade.getAllOrders();

  // Filter orders
  for (const eventId in ordersByEvent) {
    ordersByEvent[eventId] = ordersByEvent[eventId].filter(
      (order) => order.status !== "FILLED" && order.status !== "CANCELLED"
    );
  }

  // Filter trades
  for (const eventId in tradesByEvent) {
    tradesByEvent[eventId] = tradesByEvent[eventId].filter(
      (t) => t.status !== "COMPLETED" && t.status !== "CANCELLED"
    );
  }

  // Save updated state back
  trade.setAllOrders(ordersByEvent);
  trade.setAllTrades(tradesByEvent);
});
