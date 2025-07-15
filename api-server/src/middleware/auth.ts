import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.auth;
    if (!token) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret);
    req.userEmail =
      typeof decoded === "string" ? decoded : (decoded as any).email;
    next();
  } catch (error) {
    logger.error({ error }, "Invalid token");
    res.status(401).send({
      message: "Invalid token",
      error,
    });
  }
};
