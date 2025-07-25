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

export class OrderStore {
  private static orders: Record<string, Order[]> = {};

  static getOrder(eventId: string): Order[] | null {
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
}
