export interface Event {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  status: "OPEN" | "CLOSED" | "RESOLVED";
  traders: number;
  volume: number;
  createdAt: string;
  updatedAt: string;
}

export class EventStore {
  private static events: Record<string, Event> = {
    "cc64b802-759c-4bd4-90e7-905fb479c1ae": {
      id: "cc64b802-759c-4bd4-90e7-905fb479c1ae",
      title: "Will Royal Challengers Bengaluru win the IPL trophy in 2026?",
      imgUrl:
        "https://www.royalchallengers.com/themes/custom/rcbbase/images/rcb-logo-new.png",
      traders: 0,
      volume: 0,
      createdAt: "2025-07-15T11:30:49.449Z",
      updatedAt: "2025-07-15T11:30:49.449Z",
      status: "OPEN",
      description: "The source of truth is ipl.com",
    },
    "13f327be-f11a-49e8-9a58-bf1351f3bec9": {
      id: "13f327be-f11a-49e8-9a58-bf1351f3bec9",
      title:
        "Will Bitcoin reach 199,000.54 USDT or more by July 15, 2026, at 3:30 PM ?",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_1280.png",
      traders: 0,
      volume: 0,
      createdAt: "2025-07-15T11:30:49.449Z",
      updatedAt: "2025-07-15T11:30:49.449Z",
      status: "OPEN",
      description:
        "The source of truth is coingecko btc price: https://www.coingecko.com/en/coins/bitcoin",
    },
    "5259852f-11c7-40e2-bad0-630d69feab83": {
      id: "5259852f-11c7-40e2-bad0-630d69feab83",
      title:
        "Will Ethereum reach 10,000.54 USDT or more by July 15, 2026, at 3:30 PM?",
      imgUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      traders: 0,
      volume: 0,
      createdAt: "2025-07-15T11:30:49.449Z",
      updatedAt: "2025-07-15T11:30:49.449Z",
      status: "OPEN",
      description:
        "The source of truth is coingecko eth price: https://www.coingecko.com/en/coins/ethereum",
    },
  };

  // Get an event by ID
  public static getEvent(id: string): Event | undefined {
    return this.events[id] || undefined;
  }

  // Update an event
  public static updateEvent(id: string, data: Event): Event {
    const updated: Event = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.events[id] = updated;
    return updated;
  }
}
