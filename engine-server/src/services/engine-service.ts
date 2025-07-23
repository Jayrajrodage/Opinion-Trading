import { EngineHandlers } from "../generated/engine/Engine";
import { status } from "@grpc/grpc-js";
import { withAuth } from "../utils/grpc-middleware";
import { UserBalanceStore } from "../store/userBalance";

export const engineService: EngineHandlers = {
  GetUserBalance: withAuth((call, callback) => {
    const { userId } = call.request;

    // Simulate missing userId error
    if (!userId) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "userId is required",
      });
    }

    try {
      const balance = UserBalanceStore.getBalance(userId);

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
  UpdateUserBalance: withAuth((call, callback) => {
    const { userId, availableBalance, lockedBalance } = call.request;

    if (
      !userId ||
      typeof availableBalance !== "number" ||
      typeof lockedBalance !== "number"
    ) {
      return callback({
        code: 3,
        message: `${
          !userId
            ? "userId"
            : !availableBalance
            ? "availableBalance"
            : "lockedBalance"
        } is required`,
      });
    }
    const existingBalance = UserBalanceStore.getBalance(userId) || {
      availableBalance: 0.0,
      lockedBalance: 0.0,
    };

    UserBalanceStore.updateBalance(
      userId,
      existingBalance.availableBalance + availableBalance,
      existingBalance.lockedBalance + lockedBalance
    );

    callback(null, {
      status: "success",
      message: `Balance updated for user ${userId}`,
    });
  }),
};
