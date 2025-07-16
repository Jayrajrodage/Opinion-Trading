import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import LoginRoute from "./route/login";
import EventRoute from "./route/event";
import logger from "./utils/logger";
import { Auth } from "./middleware/auth";
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
app.use("/api", EventRoute);

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
