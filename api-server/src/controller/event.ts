import { Request, Response } from "express";
import logger from "../utils/logger";
import prisma from "../utils/db";
export const getEvent = async (_req: Request, res: Response) => {
  try {
    const Events = await prisma.event.findMany({
      where: { status: "OPEN" },
      select: { id: true, title: true, imgUrl: true, traders: true },
    });
    res.status(200).send({ message: "Found Event!", data: Events });
  } catch (error) {
    logger.error({ error }, "Error getting events");
    res.status(500).send({
      message: "Error getting events",
      error,
    });
  }
};

export const getEventDetails = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id || typeof id !== "string") {
      res.status(404).send({
        message: "Event id not provided",
      });
      return;
    }
    const Event = await prisma.event.findFirst({
      where: { status: "OPEN", id: id },
      select: {
        id: true,
        title: true,
        imgUrl: true,
        traders: true,
        description: true,
      },
    });
    res.status(200).send({ message: "Found Event!", data: Event });
  } catch (error) {
    logger.error({ error }, "Error getting event");
    res.status(500).send({
      message: "Error getting event",
      error,
    });
  }
};
