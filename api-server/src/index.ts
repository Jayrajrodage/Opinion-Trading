import express from "express";
import cors from "cors";
import "dotenv/config";
import "./utils/redis";
import "./worker/worker";
import cookieParser from "cookie-parser";
import LoginRoute from "./route/login";
import EventRoute from "./route/event";
import WalletRoute from "./route/wallet";
import logger from "./utils/logger";
import { Auth } from "./middleware/auth";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { dbSync } from "./utils/redis";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", LoginRoute);
app.use("/api", Auth, WalletRoute);
app.use("/api", EventRoute);

// Bull Board setup
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(dbSync)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

app.get("/api/me", Auth, (_req, res) => {
  res.send("Hi there, you are authenticated!");
});

app.get("/", (_req, res) => {
  res.send("Hello, from API server!");
});

app.listen(port, () => {
  logger.info(`API server is running on http://localhost:${port}`);
});

export { app };
