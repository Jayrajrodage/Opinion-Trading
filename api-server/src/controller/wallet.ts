import { Request, Response } from "express";
import logger from "../utils/logger";
import { getUserBalance, updateUserBalance } from "../grpc/service/engine";
import { BalanceSchema } from "../zod";
export const getBalance = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const userBalance = await getUserBalance(email);
    if (!userBalance) {
      res.status(404).send({
        message: "User balance not found",
      });
      return;
    }
    res.status(200).send({
      message: "User balance found",
      data: {
        availableBalance: userBalance.availableBalance,
        lockedBalance: userBalance.lockedBalance,
      },
    });
  } catch (error) {
    logger.error({ error }, "Error getting balance");
    res.status(500).send({
      message: "Error getting balance",
      error,
    });
  }
};

export const updateBalance = async (req: Request, res: Response) => {
  try {
    const email = req.userEmail;
    const parsedData = await BalanceSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const data = await updateUserBalance(email, parsedData.data.amount, 0);
    res.status(200).send({
      message: data?.message,
    });
  } catch (error) {
    logger.error({ error }, "Error updating balance");
    res.status(500).send({
      message: "Error updating balance",
      error,
    });
  }
};
