enum EventStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  RESOLVED = "RESOLVED",
}

export const JWT_SECRET = "secret";

export const dummyEvents = [
  {
    id: "event-123",
    title: "Presidential Election 2025",
    description: "Who will win the 2025 election?",
    imgUrl: "https://example.com/image.png",
    status: EventStatus.OPEN,
    traders: 120,
    volume: 15000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const userPayload = {
  id: "user-123",
  email: "test@example.com",
  username: "testuser",
  depositBalance: 0,
  winningsBalance: 0,
  promotionalBalance: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const serializedEvent = {
  ...dummyEvents[0],
  createdAt: dummyEvents[0].createdAt.toISOString(),
  updatedAt: dummyEvents[0].updatedAt.toISOString(),
};
