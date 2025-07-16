import { describe, expect, it, vi, beforeEach } from "vitest";
import request from "supertest";
import prisma from "../src/utils/__mocks__/db";
import { app } from "../src";
import { userPayload } from "./utils/utils";

vi.mock("../src/utils/db", () => ({ default: prisma }));

describe("POST /login", () => {
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

describe("POST /api/logout", () => {
  it("should clear auth cookie and return 200", async () => {
    const res = await request(app)
      .post("/api/logout")
      .set("Cookie", [`auth=some-token`]);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Logged out");

    const setCookie = res.headers["set-cookie"]?.[0] || "";
    expect(setCookie).toMatch(/^auth=;/);
    expect(setCookie).toContain("Path=/");
    expect(setCookie).toContain("HttpOnly");
  });

  it("should return 500 if an exception occurs", async () => {
    // Force a throw by mocking clearCookie
    const clearMock = vi.spyOn(require("express").response, "clearCookie");
    clearMock.mockImplementationOnce(() => {
      throw new Error("Mock clearCookie failure");
    });

    const res = await request(app)
      .post("/api/logout")
      .set("Cookie", [`auth=some-token`]);

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Error while Logout");

    clearMock.mockRestore();
  });
});
