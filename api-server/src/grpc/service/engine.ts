import { engineClient } from "../../utils/grpc-client";
import { UserBalanceResponse__Output } from "../types/engine/UserBalanceResponse";

export const getUserBalance = (
  userId: string
): Promise<UserBalanceResponse__Output> => {
  return new Promise((resolve, reject) => {
    engineClient.GetUserBalance({ userId }, (err, res) => {
      if (err) return reject(err);
      resolve(res as UserBalanceResponse__Output);
    });
  });
};
