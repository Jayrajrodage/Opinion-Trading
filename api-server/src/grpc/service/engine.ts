import { engineClient } from "../../utils/grpc-client";
import { UpdateUserBalanceResponse__Output } from "../types/engine/UpdateUserBalanceResponse";
import { UserBalanceResponse__Output } from "../types/engine/UserBalanceResponse";

export const getUserBalance = (
  email: string
): Promise<UserBalanceResponse__Output> => {
  return new Promise((resolve, reject) => {
    engineClient.GetUserBalance({ email }, (err, res) => {
      if (err) return reject(err);
      resolve(res as UserBalanceResponse__Output);
    });
  });
};

export const updateUserBalance = (
  email: string,
  availableBalance: number,
  lockedBalance: number
): Promise<UpdateUserBalanceResponse__Output> => {
  return new Promise((resolve, reject) => {
    engineClient.updateUserBalance(
      { email, availableBalance, lockedBalance },
      (err, res) => {
        if (err) return reject(err);
        resolve(res as UpdateUserBalanceResponse__Output);
      }
    );
  });
};
