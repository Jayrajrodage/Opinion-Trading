import { describe, expect, it } from "vitest";
import request from "supertest";
import { Express } from "express";

export const testAuthGuard = (
  app: Express,
  method: "get" | "post" | "put" | "delete",
  route: string
) => {
  describe(`Auth for ${method.toUpperCase()} ${route}`, () => {
    it("should return 401 if auth cookie is missing", async () => {
      const res = await request(app)[method](route);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Unauthorized");
    });

    it("should return 401 for invalid token", async () => {
      const res = await request(app)
        [method](route)
        .set("Cookie", [`auth=invalid-token`]);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid token");
    });
  });
};
