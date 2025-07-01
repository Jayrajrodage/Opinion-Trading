import express from "express";
import { createServer } from "http";
import prisma from "./utils/db";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from API server!");
});

// Start server
const server = app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("\nGracefully shutting down...");
  server.close(async () => {
    console.log("HTTP server closed.");
    try {
      await prisma.$disconnect();
    } catch (error) {
      console.log("🚀 ~ server.close ~ error:", error);
    }
    process.exit(0);
  });
};

// Listen for signals
process.on("SIGINT", shutdown); // Ctrl+C
process.on("SIGTERM", shutdown); // kill command or from process manager
