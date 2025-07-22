import { EngineHandlers } from "../generated/engine/Engine";
import { status } from "@grpc/grpc-js";
import { withAuth } from "../utils/grpc-middleware";

export const engineService: EngineHandlers = {
  GetUserBalance: withAuth((call, callback) => {
    console.log("🚀 ~ GetUserBalance:withAuth ~ call:", call.request);
    const { userId } = call.request;

    // Simulate missing userId error
    if (!userId) {
      return callback({
        code: status.INVALID_ARGUMENT,
        message: "userId is required",
      });
    }

    try {
      // Simulated fetch from database or order engine
      const balance = {
        availableBalance: 100.5,
        locked_balance: 20.0,
      };

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
};
