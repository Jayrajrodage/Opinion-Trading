import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import LoginRoute from "./route/login";
import logger from "./utils/logger";
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

app.get("/", (_req, res) => {
  res.send("Hello, from API server!");
});

app.listen(port, () => {
  logger.info(`API server is running on http://localhost:${port}`);
});

export { app };
