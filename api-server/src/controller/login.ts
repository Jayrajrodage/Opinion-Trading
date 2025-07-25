import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { LoginSchema } from "../zod";
import prisma from "../utils/db";
import logger from "../utils/logger";

export const Login = async (req: Request, res: Response) => {
  try {
    const parsedData = await LoginSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.issues.map(
        (obj) => `${obj.message}: ${obj.path[0]}`
      );
      res.status(400).send({ message: errorMessages });
      return;
    }
    const { email } = parsedData.data;
    const secretKey = process.env.JWT_SECRET || "";
    const isExists = await prisma.user.findUnique({ where: { email: email } });
    if (!isExists) {
      const name = email.split("@")[0];
      const data = await prisma.user.create({
        data: { email: email, username: name },
      });
      const token = jwt.sign({ userId: data.id }, secretKey, {
        expiresIn: "7d",
      });
      res.cookie("auth", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
      });
      res.status(200).send({ message: "successfully login" });
      return;
    }
    const token = jwt.sign({ userId: isExists.id }, secretKey, {
      expiresIn: "7d",
    });
    res.cookie("auth", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "strict",
    });
    res.status(200).send({ message: "successfully login" });
  } catch (error) {
    logger.error({ error }, "Login error");
    res.status(500).send({
      message: "Error while login",
      error,
    });
  }
};

export const Logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("auth", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.status(200).send({ message: "Logged out" });
  } catch (error) {
    logger.error({ error }, "Logout error");
    res.status(500).send({
      message: "Error while Logout",
      error,
    });
  }
};
