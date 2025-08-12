import { Order, Trade, OrderBook, fills } from "../types";
import { dbSync, redisClient } from "../utils/redis";
import { UserBalanceStore } from "./userBalance";

export class trade {
  private static orders: Record<string, Order[]> = {};
  private static trades: Record<string, Trade[]> = {};

  public static getAllOrders(): Record<string, Order[]> {
    return this.orders;
  }

  // Getter for all trades grouped by eventId
  public static getAllTrades(): Record<string, Trade[]> {
    return this.trades;
  }

  public static setAllOrders(data: Record<string, Order[]>) {
    this.orders = data;
  }

  public static setAllTrades(data: Record<string, Trade[]>) {
    this.trades = data;
  }

  static getOrders(eventId: string): Order[] {
    return this.orders[eventId] || [];
  }
  static getTrades(eventId: string): Trade[] {
    return this.trades[eventId] || [];
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
    dbSync
      .add("tradeUpsert", {
        trade,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(tradeUpsert) failed:", error);
      });
  }

  static updateOrder(
    eventId: string,
    orderId: string,
    data: Partial<Order>
  ): void {
    const orderList = this.getOrders(eventId);

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
        trade: updated,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(tradeUpsert) failed:", error);
      });
  }

  static getYesOrders(eventId: string, userId: string): Order[] {
    const orders = this.orders[eventId] || [];
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

  static getNoOrders(eventId: string, userId: string): Order[] {
    const orders = this.orders[eventId] || [];
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

  static getInvestedAmount(
    eventId: string,
    userId: string,
    tradeId: string
  ): number {
    const trades = this.getTrades(eventId);
    const trade = trades.find((t) => t.id === tradeId && t.userId === userId);
    return trade?.invested || 0;
  }

  static getOrderBook(eventId: string): OrderBook {
    const orders = this.getOrders(eventId);

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

  static exitYesTrade(entryOrder: Order, trade: Trade): void {
    const yesOrders = this.getYesOrders(entryOrder.eventId, entryOrder.userId);
    if (yesOrders.length === 0) {
      console.error("❌ zero no orders available to match with yes order");
      return;
    }

    let totalYesQty = 0;
    for (const yesOrder of yesOrders) {
      const noRemainingQty = yesOrder.quantity - yesOrder.matchedQuantity;
      if (noRemainingQty <= 0) continue;
      totalYesQty += noRemainingQty;
      if (totalYesQty >= entryOrder.quantity) break;
    }
    if (totalYesQty < entryOrder.matchedQuantity) {
      console.error("❌ Not enough Yes orders to match No order");
      return;
    }

    const noOrder: Order = {
      id: Date.now().toString(),
      tradeId: entryOrder.tradeId,
      userId: entryOrder.userId,
      eventId: entryOrder.eventId,
      side: "NO",
      orderType: "MARKET",
      matchedQuantity: entryOrder.matchedQuantity,
      price: 0,
      quantity: entryOrder.matchedQuantity,
      status: "FILLED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ✅ Sort NO orders by ascending price for best match
    yesOrders.sort((a, b) => a.price - b.price);

    let TotalReturns = 0;
    let qtyToMatch = entryOrder.matchedQuantity;
    const fills: Array<fills> = [];
    for (const yesOrder of yesOrders) {
      if (qtyToMatch === 0) break;
      const yesRemainingQty = yesOrder.quantity - yesOrder.matchedQuantity;
      if (yesRemainingQty <= 0) continue;
      const matchQty = Math.min(qtyToMatch, yesRemainingQty);
      TotalReturns += yesOrder.price * matchQty;

      // ⚡ Update yes order
      this.updateOrder(yesOrder.eventId, yesOrder.id, {
        matchedQuantity: yesOrder.matchedQuantity + matchQty,
        status:
          yesOrder.matchedQuantity + matchQty >= yesOrder.quantity
            ? "FILLED"
            : "PARTIAL",
      });

      const yesInvested = this.getInvestedAmount(
        yesOrder.eventId,
        yesOrder.userId,
        yesOrder.tradeId
      );
      const newYesInvested = yesOrder.price * matchQty;
      this.updateTrade(yesOrder.eventId, yesOrder.tradeId, {
        invested: yesInvested + newYesInvested,
      });

      redisClient
        .publish(
          "market_update",
          JSON.stringify({
            eventId: entryOrder.eventId,
            yes: [[yesOrder.price, matchQty]],
            no: [[noOrder.price, matchQty]],
          })
        )
        .catch((err) => console.error("publish failed:", err));

      fills.push({
        name: "fills",
        data: {
          id: Date.now().toString(),
          eventId: yesOrder.eventId,
          yesOrderId: yesOrder.id,
          noOrderId: noOrder.id,
          quantity: matchQty,
          noPrice: 10 - yesOrder.price,
          yesPrice: yesOrder.price,
        },
      });

      qtyToMatch -= matchQty;
    }
    const noPrice = 10 - TotalReturns / entryOrder.matchedQuantity;
    noOrder.price = parseFloat(noPrice.toFixed(1));
    dbSync
      .add("orderUpsert", {
        order: noOrder,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(orderUpsert) failed:", error);
      });

    // ✅ Final YES order update
    this.updateOrder(entryOrder.eventId, entryOrder.id, {
      status: "FILLED",
    });

    if (fills.length > 0) {
      dbSync.addBulk(fills).catch((error) => {
        console.error("❌ Adding jobs to dbSync(fills) failed:", error);
      });
    }
    const P_L = TotalReturns - (trade.invested || 0);
    this.updateTrade(entryOrder.tradeId, trade.id, {
      exit_order_id: noOrder.id,
      status: "COMPLETED",
      updatedAt: new Date().toISOString(),
      return: TotalReturns,
      pnl: P_L,
    });
    const remainingLockedAmount =
      entryOrder.quantity - entryOrder.matchedQuantity !== 0
        ? entryOrder.price * (entryOrder.quantity - entryOrder.matchedQuantity)
        : 0;
    const lockedAmount = entryOrder.price * entryOrder.quantity;
    const yesUserBalance = UserBalanceStore.getBalance(entryOrder.userId);
    if (!yesUserBalance) {
      console.error("❌ User balance not found");
      return;
    }
    UserBalanceStore.updateBalance(
      entryOrder.userId,
      yesUserBalance.availableBalance + remainingLockedAmount + P_L,
      yesUserBalance.lockedBalance - lockedAmount
    );
  }

  static exitNoTrade(entryOrder: Order, trade: Trade): void {
    const noOrders = this.getNoOrders(entryOrder.eventId, entryOrder.userId);
    if (noOrders.length === 0) {
      console.error("❌ zero no orders available to match with yes order");
      return;
    }

    let totalNoQty = 0;
    for (const noOrder of noOrders) {
      const noRemainingQty = noOrder.quantity - noOrder.matchedQuantity;
      if (noRemainingQty <= 0) continue;
      totalNoQty += noRemainingQty;
      if (totalNoQty >= entryOrder.quantity) break;
    }
    if (totalNoQty < entryOrder.matchedQuantity) {
      console.error("❌ Not enough Yes orders to match No order");
      return;
    }

    const yesOrder: Order = {
      id: Date.now().toString(),
      tradeId: entryOrder.tradeId,
      userId: entryOrder.userId,
      eventId: entryOrder.eventId,
      side: "YES",
      orderType: "MARKET",
      matchedQuantity: entryOrder.matchedQuantity,
      price: 0,
      quantity: entryOrder.matchedQuantity,
      status: "FILLED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // ✅ Sort NO orders by ascending price for best match
    noOrders.sort((a, b) => a.price - b.price);

    let TotalReturns = 0;
    let qtyToMatch = entryOrder.matchedQuantity;
    const fills: Array<fills> = [];
    for (const noOrder of noOrders) {
      if (qtyToMatch === 0) break;
      const noRemainingQty = noOrder.quantity - noOrder.matchedQuantity;
      if (noRemainingQty <= 0) continue;
      const matchQty = Math.min(qtyToMatch, noRemainingQty);
      TotalReturns += noOrder.price * matchQty;

      // ⚡ Update yes order
      this.updateOrder(noOrder.eventId, noOrder.id, {
        matchedQuantity: noOrder.matchedQuantity + matchQty,
        status:
          noOrder.matchedQuantity + matchQty >= noOrder.quantity
            ? "FILLED"
            : "PARTIAL",
      });

      const noInvested = this.getInvestedAmount(
        noOrder.eventId,
        noOrder.userId,
        noOrder.tradeId
      );
      const newNoInvested = noOrder.price * matchQty;
      this.updateTrade(noOrder.eventId, noOrder.tradeId, {
        invested: noInvested + newNoInvested,
      });

      redisClient
        .publish(
          "market_update",
          JSON.stringify({
            eventId: entryOrder.eventId,
            yes: [[yesOrder.price, matchQty]],
            no: [[noOrder.price, matchQty]],
          })
        )
        .catch((err) => console.error("publish failed:", err));

      fills.push({
        name: "fills",
        data: {
          id: Date.now().toString(),
          eventId: noOrder.eventId,
          yesOrderId: yesOrder.id,
          noOrderId: noOrder.id,
          quantity: matchQty,
          noPrice: noOrder.price,
          yesPrice: 10 - noOrder.price,
        },
      });

      qtyToMatch -= matchQty;
    }
    const yesPrice = 10 - TotalReturns / entryOrder.matchedQuantity;
    yesOrder.price = parseFloat(yesPrice.toFixed(1));
    dbSync
      .add("orderUpsert", {
        order: yesOrder,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(orderUpsert) failed:", error);
      });

    // ✅ Final YES order update
    this.updateOrder(entryOrder.eventId, entryOrder.id, {
      status: "FILLED",
    });

    if (fills.length > 0) {
      dbSync.addBulk(fills).catch((error) => {
        console.error("❌ Adding jobs to dbSync(fills) failed:", error);
      });
    }
    const P_L = TotalReturns - (trade.invested || 0);
    this.updateTrade(entryOrder.tradeId, trade.id, {
      exit_order_id: yesOrder.id,
      status: "COMPLETED",
      updatedAt: new Date().toISOString(),
      return: TotalReturns,
      pnl: P_L,
    });
    const remainingLockedAmount =
      entryOrder.quantity - entryOrder.matchedQuantity !== 0
        ? entryOrder.price * (entryOrder.quantity - entryOrder.matchedQuantity)
        : 0;
    const lockedAmount = entryOrder.price * entryOrder.quantity;
    const userBalance = UserBalanceStore.getBalance(entryOrder.userId);
    if (!userBalance) {
      console.error("❌ User balance not found");
      return;
    }
    UserBalanceStore.updateBalance(
      entryOrder.userId,
      userBalance.availableBalance + remainingLockedAmount + P_L,
      userBalance.lockedBalance - lockedAmount
    );
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

    this.createTrade({
      id: yesOrder.tradeId,
      entry_order_id: yesOrder.id,
      userId: yesOrder.userId,
      eventId: yesOrder.eventId,
      invested: 0,
      return: 0,
      pnl: 0,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const noOrders = this.getNoOrders(eventId, yesOrder.userId);
    if (noOrders.length === 0) {
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
      if (noOrder.price >= 10 - yesOrder.price) continue;

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

      const noInvested = this.getInvestedAmount(
        eventId,
        noOrder.userId,
        noOrder.tradeId
      );
      const newNoInvested = noOrder.price * matchQty;
      this.updateTrade(eventId, noOrder.tradeId, {
        invested: noInvested + newNoInvested,
      });

      redisClient
        .publish(
          "market_update",
          JSON.stringify({
            eventId,
            yes: [[yesOrder.price, matchQty]],
            no: [[noOrder.price, matchQty]],
          })
        )
        .catch((err) => console.error("publish failed:", err));

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

    this.createTrade({
      id: noOrder.tradeId,
      entry_order_id: noOrder.id,
      invested: 0,
      return: 0,
      pnl: 0,
      userId: noOrder.userId,
      eventId: noOrder.eventId,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const yesOrders = this.getYesOrders(eventId, noOrder.userId);
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

      if (yesOrder.price >= 10 - noOrder.price) continue;

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

      const yesInvested = this.getInvestedAmount(
        eventId,
        yesOrder.userId,
        yesOrder.tradeId
      );
      const newYesInvestment = yesOrder.price * matchQty;
      this.updateTrade(eventId, yesOrder.tradeId, {
        invested: yesInvested + newYesInvestment,
      });
      const noInvested = this.getInvestedAmount(
        eventId,
        noOrder.userId,
        noOrder.tradeId
      );
      const newNoInvestment = (10 - yesOrder.price) * matchQty;
      this.updateTrade(eventId, noOrder.tradeId, {
        invested: noInvested + newNoInvestment,
      });

      redisClient
        .publish(
          "market_update",
          JSON.stringify({
            eventId,
            yes: [[yesOrder.price, matchQty]],
            no: [[noOrder.price, matchQty]],
          })
        )
        .catch((err) => console.error("publish failed:", err));

      fills.push({
        name: "fillsCreate",
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

  static exitTrade(eventId: string, tradeId: string): void {
    const trades = this.getTrades(eventId);

    const trade = trades.find((t) => t.id === tradeId);
    if (!trade) {
      console.error(`Trade ${tradeId} not found`);
      return;
    }
    const orders = this.getOrders(eventId);
    const entryOrder = orders.find((o) => o.id === trade.entry_order_id);
    if (!entryOrder) {
      console.error(`Entry order ${trade.entry_order_id} not found`);
      return;
    }
    if (entryOrder.status === "CANCELLED") {
      console.error(`Entry order ${entryOrder.id} is already cancelled`);
      return;
    }
    if (entryOrder.status === "PARTIAL" || entryOrder.status === "FILLED") {
      if (entryOrder.side === "YES") {
        this.exitYesTrade(entryOrder, trade);
        return;
      }
      if (entryOrder.side === "NO") {
        this.exitNoTrade(entryOrder, trade);
        return;
      }
    }

    if (entryOrder.status === "OPEN") {
      // ✅ Cancel the order
      this.updateOrder(eventId, entryOrder.id, {
        status: "CANCELLED",
      });

      // ✅ Cancel the trade
      this.updateTrade(eventId, tradeId, {
        status: "CANCELLED",
        updatedAt: new Date().toISOString(),
        invested: 0,
        return: 0,
        pnl: 0,
      });

      const userBalance = UserBalanceStore.getBalance(entryOrder.userId);
      if (!userBalance) {
        console.error("User balance not found");
        return;
      }
      const lockedAmount = entryOrder.price * entryOrder.quantity;
      UserBalanceStore.updateBalance(
        entryOrder.userId,
        userBalance.availableBalance + lockedAmount,
        userBalance.lockedBalance - lockedAmount
      );
      return;
    }
  }

  static getYesPrice(eventId: string, userId: string, quantity: number) {
    const orders = this.getNoOrders(eventId, userId);
    if (orders.length === 0) {
      console.error("❌ orders not found");
    }
    let qtyRemaining = quantity;
    let totalCost = 0;
    for (const order of orders) {
      if (qtyRemaining <= 0) break;

      const availableQty = order.quantity - order.matchedQuantity;
      if (availableQty <= 0) continue;

      const matchQty = Math.min(qtyRemaining, availableQty);

      totalCost += order.price * matchQty;

      qtyRemaining -= matchQty;
    }
    const price = 10 - totalCost / quantity;

    return price;
  }

  static getNoPrice(eventId: string, userId: string, quantity: number) {
    const orders = this.getYesOrders(eventId, userId);
    if (orders.length === 0) {
      console.error("❌ orders not found");
    }
    let qtyRemaining = quantity;
    let totalCost = 0;
    for (const order of orders) {
      if (qtyRemaining <= 0) break;

      const availableQty = order.quantity - order.matchedQuantity;
      if (availableQty <= 0) continue;

      const matchQty = Math.min(qtyRemaining, availableQty);

      totalCost += order.price * matchQty;

      qtyRemaining -= matchQty;
    }
    const price = 10 - totalCost / quantity;

    return price;
  }
}
