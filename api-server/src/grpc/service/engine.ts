import { engineClient } from "../../utils/grpc-client";
import { IncreaseUserBalanceResponse__Output } from "../types/engine/IncreaseUserBalanceResponse";
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

export const increaseUserBalance = (
  userId: string,
  availableBalance: number,
  lockedBalance: number
): Promise<IncreaseUserBalanceResponse__Output> => {
  return new Promise((resolve, reject) => {
    engineClient.increaseUserBalance(
      { userId, availableBalance, lockedBalance },
      (err, res) => {
        if (err) return reject(err);
        resolve(res as IncreaseUserBalanceResponse__Output);
      }
    );
  });
};

export const decreaseUserBalance = (
  userId: string,
  availableBalance: number,
  lockedBalance: number
): Promise<IncreaseUserBalanceResponse__Output> => {
  return new Promise((resolve, reject) => {
    engineClient.decreaseUserBalance(
      { userId, availableBalance, lockedBalance },
      (err, res) => {
        if (err) return reject(err);
        resolve(res as IncreaseUserBalanceResponse__Output);
      }
    );
  });
};
