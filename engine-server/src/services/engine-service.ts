import { EngineHandlers } from "../generated/engine/Engine";
import { status } from "@grpc/grpc-js";
import { withAuth } from "../scripts/grpc-middleware";
import { UserBalanceStore } from "../store/userBalance";
import { dbSync } from "../utils/redis";

export const engineService: EngineHandlers = {
  GetUserBalance: withAuth((call, callback) => {
    const { email } = call.request;

    // Simulate missing userId error
    if (!email) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "email is required",
      });
    }

    try {
      const balance = UserBalanceStore.getBalance(email);

      if (!balance) {
        return callback({
          code: status.UNAVAILABLE,
          message: "balance not found for user",
        });
      }

      // Respond with balance
      callback(null, balance);
    } catch (err) {
      // Catch any unexpected error
      callback({
        code: status.INTERNAL,
        message: "Failed to fetch user balance",
      });
    }
  }),

  GetOrderBook: withAuth((call, callback) => {
    const { symbol, limit } = call.request;

    // Fake order book (replace with real data)
    const response = {
      bids: [
        { price: 29900.5, quantity: 1.2 },
        { price: 29850.0, quantity: 0.8 },
      ].slice(0, limit),

      asks: [
        { price: 30010.0, quantity: 1.1 },
        { price: 30050.5, quantity: 2.0 },
      ].slice(0, limit),
    };

    callback(null, response);
  }),
  UpdateUserBalance: withAuth(async (call, callback) => {
    try {
      const { email, availableBalance, lockedBalance } = call.request;

      if (
        !email ||
        typeof availableBalance !== "number" ||
        typeof lockedBalance !== "number"
      ) {
        return callback({
          code: 3,
          message: `${
            !email
              ? "email"
              : !availableBalance
              ? "availableBalance"
              : "lockedBalance"
          } is required`,
        });
      }
      const existingBalance = UserBalanceStore.getBalance(email) || {
        availableBalance: 0.0,
        lockedBalance: 0.0,
      };

      UserBalanceStore.updateBalance(
        email,
        existingBalance.availableBalance + availableBalance,
        existingBalance.lockedBalance + lockedBalance
      );

      // await dbSync.add("userBalance", {
      //   email: email,
      //   availableBalance: existingBalance.availableBalance + availableBalance,
      //   lockedBalance: existingBalance.lockedBalance + lockedBalance,
      // });

      callback(null, {
        status: "success",
        message: `Balance updated for user ${email}`,
      });
    } catch (error) {
      console.log("🚀 ~ UpdateUserBalance:withAuth ~ error:", error);
      callback({
        code: status.INTERNAL,
        message: "Failed to update user balance",
      });
    }
  }),
};
