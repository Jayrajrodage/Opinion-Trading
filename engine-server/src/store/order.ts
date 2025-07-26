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

export class OrderStore {
  private static orders: Record<string, Order[]> = {};

  static getOrders(eventId: string): Order[] | null {
    return this.orders[eventId] || null;
  }

  static createOrder(order: Order): void {
    const eventId = order.eventId;
    if (!this.orders[eventId]) {
      this.orders[eventId] = [];
    }
    this.orders[eventId].push(order);
  }

  static updateOrder(
    eventId: string,
    orderId: string,
    data: Partial<Order>
  ): Order | null {
    const orderList = this.orders[eventId];
    if (!orderList) return null;

    const index = orderList.findIndex((o) => o.id === orderId);
    if (index === -1) return null;

    const existing = orderList[index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    orderList[index] = updated;
    return updated;
  }

  static getYesOrder(eventId: string): Order[] | null {
    const orders = this.orders[eventId] || null;
    if (!orders) return null;
    return (
      orders.filter(
        (order) =>
          order.side === "YES" &&
          order.status !== "CANCELLED" &&
          order.status !== "FILLED"
      ) || []
    );
  }

  static getNoOrder(eventId: string): Order[] | null {
    const orders = this.orders[eventId] || null;
    if (!orders) return null;
    return (
      orders.filter(
        (order) =>
          order.side === "NO" &&
          order.status !== "CANCELLED" &&
          order.status !== "FILLED"
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
}
