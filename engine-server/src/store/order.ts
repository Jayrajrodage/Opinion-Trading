import { dbSync } from "../utils/redis";
import { UserBalanceStore } from "./userBalance";

export interface Order {
  id: string;
  userId: string;
  eventId: string;
  side: "YES" | "NO";
  orderType: "LIMIT" | "MARKET";
  matchedQuantity: number;
  price: number;
  quantity: number;
  status: "OPEN" | "PARTIAL" | "FILLED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
}

export interface OrderBook {
  yesOrders: OrderBookLevel[];
  noOrders: OrderBookLevel[];
  maxYesPrice: number;
  maxNoPrice: number;
}

export interface fills {
  name: string;
  data: {
    id: string;
    eventId: string;
    yesOrderId: string;
    noOrderId: string;
    yesPrice: number;
    noPrice: number;
    quantity: number;
  };
}

export interface Trade {
  id: string;
  entry_order_id: string;
  exit_order_id?: string;
  userId: string;
  eventId: string;
  invested?: number;
  return?: number;
  pnl?: number;
  status: "OPEN" | "COMPLETED" | "DECLARED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}

export class OrderStore {
  private static orders: Record<string, Order[]> = {};
  private static trades: Record<string, Trade[]> = {};

  static getOrders(eventId: string): Order[] {
    return this.orders[eventId] || [];
  }

  static createOrder(order: Order): void {
    const eventId = order.eventId;
    if (!this.orders[eventId]) {
      this.orders[eventId] = [];
    }
    this.orders[eventId].push(order);
    if (order.side === "YES") {
      this.matchYesOrder(eventId, order);
    } else {
      this.matchNoOrder(eventId, order);
    }
  }

  static createTrade(trade: Trade): void {
    const eventId = trade.eventId;
    if (!this.trades[eventId]) {
      this.trades[eventId] = [];
    }
    this.trades[eventId].push(trade);
  }

  static updateOrder(
    eventId: string,
    orderId: string,
    data: Partial<Order>
  ): void {
    const orderList = this.orders[eventId];

    const index = orderList.findIndex((o) => o.id === orderId);
    if (index === -1) {
      console.error(`Order: ${orderId} not found`);
      return;
    }

    const existing = orderList[index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    orderList[index] = updated;

    dbSync
      .add("orderUpsert", {
        eventId,
        order: updated,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(orderUpsert) failed:", error);
      });
  }

  static updateTrade(
    eventId: string,
    tradeId: string,
    data: Partial<Trade>
  ): void {
    const tradeList = this.trades[eventId];

    const index = tradeList.findIndex((o) => o.id === tradeId);
    if (index === -1) {
      console.error(`Trade: ${tradeId} not found`);
      return;
    }

    const existing = tradeList[index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    tradeList[index] = updated;

    dbSync
      .add("tradeUpsert", {
        eventId,
        trade: updated,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(tradeUpsert) failed:", error);
      });
  }

  static getYesOrder(eventId: string, userId: string): Order[] {
    const orders = this.orders[eventId] || [];
    if (!orders) {
      return [];
    }
    return (
      orders.filter(
        (order) =>
          order.side === "YES" &&
          order.status !== "CANCELLED" &&
          order.status !== "FILLED" &&
          order.userId !== userId
      ) || []
    );
  }

  static getNoOrder(eventId: string, userId: string): Order[] {
    const orders = this.orders[eventId] || [];
    if (!orders) {
      return [];
    }
    return (
      orders.filter(
        (order) =>
          order.side === "NO" &&
          order.status !== "CANCELLED" &&
          order.status !== "FILLED" &&
          order.userId !== userId
      ) || []
    );
  }

  static getOrderBook(eventId: string): OrderBook {
    const orders = this.orders[eventId] || [];

    const yesMap = new Map<number, number>();
    const noMap = new Map<number, number>();

    for (const order of orders) {
      if (order.status === "CANCELLED" || order.status === "FILLED") continue;

      const remainingQty = order.quantity - order.matchedQuantity;
      if (remainingQty <= 0) continue;

      const map = order.side === "YES" ? yesMap : noMap;
      map.set(order.price, (map.get(order.price) || 0) + remainingQty);
    }

    const yesOrders = Array.from(yesMap.entries())
      .map(([price, quantity]) => ({ price, quantity }))
      .sort((a, b) => b.price - a.price);

    const noOrders = Array.from(noMap.entries())
      .map(([price, quantity]) => ({ price, quantity }))
      .sort((a, b) => a.price - b.price);

    const maxYesPrice = yesOrders.length > 0 ? yesOrders[0].price : 0;
    const maxNoPrice =
      noOrders.length > 0 ? noOrders[noOrders.length - 1].price : 0;

    return {
      yesOrders,
      noOrders,
      maxYesPrice,
      maxNoPrice,
    };
  }

  static matchYesOrder(eventId: string, yesOrder: Order): void {
    const yesUserBalance = UserBalanceStore.getBalance(yesOrder.userId);

    if (!yesUserBalance) {
      console.error("❌ User balance not found");
      return;
    }

    if (yesUserBalance.availableBalance < yesOrder.price * yesOrder.quantity) {
      console.error("❌ Insufficient balance for YES order");
      return;
    }
    const amount = yesOrder.price * yesOrder.quantity;

    UserBalanceStore.updateBalance(
      yesOrder.userId,
      yesUserBalance.availableBalance - amount,
      yesUserBalance.lockedBalance + amount
    );

    const noOrders = this.getNoOrder(eventId, yesOrder.userId);
    if (!noOrders || noOrders.length === 0) {
      console.error("❌ zero no orders available to match with yes order");
      return;
    }

    // ✅ Sort NO orders by ascending price for best match
    noOrders.sort((a, b) => a.price - b.price);

    let remainingYesQty = yesOrder.quantity - yesOrder.matchedQuantity;

    const fills: Array<fills> = [];
    for (const noOrder of noOrders) {
      const noRemainingQty = noOrder.quantity - noOrder.matchedQuantity;
      if (noRemainingQty <= 0) continue;

      // ✅ Check binary market constraint
      if (noOrder.price > 10 - yesOrder.price) continue;

      const matchQty = Math.min(remainingYesQty, noRemainingQty);

      // ⚡ Update YES order (in-memory first)
      yesOrder.matchedQuantity += matchQty;
      remainingYesQty -= matchQty;

      // ⚡ Update NO order
      this.updateOrder(eventId, noOrder.id, {
        matchedQuantity: noOrder.matchedQuantity + matchQty,
        status:
          noOrder.matchedQuantity + matchQty >= noOrder.quantity
            ? "FILLED"
            : "PARTIAL",
      });

      fills.push({
        name: "fills",
        data: {
          id: Date.now().toString(),
          eventId,
          yesOrderId: yesOrder.id,
          noOrderId: noOrder.id,
          quantity: matchQty,
          noPrice: noOrder.price,
          yesPrice: yesOrder.price,
        },
      });
      // ✅ Break if fully matched
      if (remainingYesQty === 0) break;
    }

    // ✅ Final YES order update
    this.updateOrder(eventId, yesOrder.id, {
      matchedQuantity: yesOrder.matchedQuantity,
      status:
        yesOrder.matchedQuantity >= yesOrder.quantity ? "FILLED" : "PARTIAL",
    });

    this.createTrade({
      id: Date.now().toString(),
      entry_order_id: yesOrder.id,
      userId: yesOrder.userId,
      eventId: yesOrder.eventId,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    if (fills.length > 0) {
      dbSync.addBulk(fills).catch((error) => {
        console.error("❌ Adding jobs to dbSync(fills) failed:", error);
      });
    }
  }

  static matchNoOrder(eventId: string, noOrder: Order): void {
    const noUserBalance = UserBalanceStore.getBalance(noOrder.userId);

    if (!noUserBalance) {
      console.error("❌ User balance not found");
      return;
    }

    const amount = noOrder.price * noOrder.quantity;
    if (noUserBalance.availableBalance < amount) {
      console.error("❌ Insufficient balance for NO order");
      return;
    }

    // 💰 Lock balance
    UserBalanceStore.updateBalance(
      noOrder.userId,
      noUserBalance.availableBalance - amount,
      noUserBalance.lockedBalance + amount
    );

    const yesOrders = this.getYesOrder(eventId, noOrder.userId);
    if (!yesOrders || yesOrders.length === 0) {
      console.error("❌ zero YES orders available to match with NO order");
      return;
    }

    // ✅ Sort YES orders by ascending price (best for seller match)
    yesOrders.sort((a, b) => a.price - b.price);

    let remainingNoQty = noOrder.quantity - noOrder.matchedQuantity;

    const fills: Array<fills> = [];
    for (const yesOrder of yesOrders) {
      const yesRemainingQty = yesOrder.quantity - yesOrder.matchedQuantity;
      if (yesRemainingQty <= 0) continue;

      // ✅ Binary constraint: YES price <= 10 - NO price
      if (yesOrder.price > 10 - noOrder.price) continue;

      const matchQty = Math.min(remainingNoQty, yesRemainingQty);

      // ⚡ Update NO order (in-memory)
      noOrder.matchedQuantity += matchQty;
      remainingNoQty -= matchQty;

      // ⚡ Update YES order
      this.updateOrder(eventId, yesOrder.id, {
        matchedQuantity: yesOrder.matchedQuantity + matchQty,
        status:
          yesOrder.matchedQuantity + matchQty >= yesOrder.quantity
            ? "FILLED"
            : "PARTIAL",
      });
      fills.push({
        name: "fills",
        data: {
          id: `${Date.now()}`,
          eventId,
          yesOrderId: yesOrder.id,
          noOrderId: noOrder.id,
          quantity: matchQty,
          noPrice: noOrder.price,
          yesPrice: yesOrder.price,
        },
      });
      if (remainingNoQty === 0) break;
    }

    this.createTrade({
      id: Date.now().toString(),
      entry_order_id: noOrder.id,
      userId: noOrder.userId,
      eventId: noOrder.eventId,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // ✅ Final NO order update
    this.updateOrder(eventId, noOrder.id, {
      matchedQuantity: noOrder.matchedQuantity,
      status:
        noOrder.matchedQuantity >= noOrder.quantity ? "FILLED" : "PARTIAL",
    });

    if (fills.length > 0) {
      // 🚀 Push fill jobs to queue
      dbSync.addBulk(fills).catch((error) => {
        console.error("❌ Adding jobs to dbSync(fills) failed:", error);
      });
    }
  }
}
