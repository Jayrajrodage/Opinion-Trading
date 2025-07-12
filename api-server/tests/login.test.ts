import { describe, expect, it, vi, beforeEach } from "vitest";
import request from "supertest";
import prisma from "../src/utils/__mocks__/db";
import { app } from "../src";

vi.mock("../src/utils/db", () => ({ default: prisma }));

describe("POST /login", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  const userPayload = {
    id: "user-123",
    email: "test@example.com",
    username: "testuser",
    depositBalance: 0,
    winningsBalance: 0,
    promotionalBalance: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  it("should return 400 for invalid email", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "invalid" });

    expect(res.status).toBe(400);
    expect(res.body.message[0]).toContain("Invalid"); // Zod message
  });

  it("should create user and return 200 for new email", async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue(userPayload);

    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("successfully login");
    expect(res.headers["set-cookie"][0]).toContain("auth=");
    expect(prisma.user.create).toHaveBeenCalled();
  });

  it("should login existing user and return 200", async () => {
    prisma.user.findUnique.mockResolvedValue(userPayload);

    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("successfully login");
    expect(res.headers["set-cookie"][0]).toContain("auth=");
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("should handle internal errors gracefully", async () => {
    prisma.user.findUnique.mockRejectedValue(new Error("DB error"));

    const res = await request(app)
      .post("/api/login")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error while login");
  });
});
