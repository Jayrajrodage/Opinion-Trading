import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import prisma from "../src/utils/__mocks__/db";
import { app } from "../src";
import { testAuthGuard } from "./utils/testAuth";
import { dummyEvents, JWT_SECRET, serializedEvent } from "./utils/utils";

vi.mock("../src/utils/db", () => ({ default: prisma }));

describe("GET /api/events", () => {
  let token: string;
  beforeEach(() => {
    token = jwt.sign({ email: "test@example.com" }, JWT_SECRET);
  });
  testAuthGuard(app, "get", "/api/events");
  it("should return 200 and events for valid user", async () => {
    prisma.event.findMany.mockResolvedValue(dummyEvents);

    const res = await request(app)
      .get("/api/events")
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(200);
    const serializedEvents = dummyEvents.map((event) => ({
      ...event,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }));
    expect(res.body.data).toEqual(serializedEvents);
  });
  it("should return 500 on DB failure", async () => {
    prisma.event.findMany.mockRejectedValue(new Error("DB failure"));
    const res = await request(app)
      .get("/api/events")
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error getting events");
  });
});

describe("GET /api/event/:id", () => {
  let token: string;

  beforeEach(() => {
    token = jwt.sign({ email: "test@example.com" }, JWT_SECRET);
  });

  testAuthGuard(app, "get", `/api/event/${dummyEvents[0].id}`);

  it("should return 404 if id is not provided", async () => {
    const res = await request(app)
      .get("/api/event/")
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(404);
  });

  it("should return 200 with event details for a valid id", async () => {
    prisma.event.findFirst.mockResolvedValue(dummyEvents[0]);

    const res = await request(app)
      .get(`/api/event/${dummyEvents[0].id}`)
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(serializedEvent);
  });

  it("should return 200 with null if event is not found", async () => {
    prisma.event.findFirst.mockResolvedValue(null);

    const res = await request(app)
      .get(`/api/event/non-existing-id`)
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(200);
    expect(res.body.data).toBe(null);
  });

  it("should return 500 on internal server error", async () => {
    prisma.event.findFirst.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .get(`/api/event/${dummyEvents[0].id}`)
      .set("Cookie", [`auth=${token}`]);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error getting event");
  });
});
