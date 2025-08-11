export interface Order {
  id: string;
  tradeId: string;
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
  invested: number;
  return: number;
  pnl: number;
  status: "OPEN" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
}
export interface priceResponse {
  price: number;
  canInvest: boolean;
}
