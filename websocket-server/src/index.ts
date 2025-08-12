import express from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { redisSubscriber, initRedis } from "./config/redisClient";
import "dotenv/config";
// Creates Express app
const app = express();

// Creates HTTP server (needed for Socket.IO)
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on("subscribeEvent", (eventId: string) => {
    socket.join(eventId);
  });

  socket.on("unsubscribeEvent", (eventId: string) => {
    socket.leave(eventId);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

async function start() {
  await initRedis();

  await redisSubscriber.subscribe("market_updates", (message) => {
    try {
      const data = JSON.parse(message);
      const { eventId, yes, no } = data;

      io.to(eventId).emit("market_update", {
        yes,
        no,
      });
    } catch (err) {
      console.error("❌ Failed to parse Redis message:", err);
    }
  });

  const port = process.env.PORT;
  server.listen(port, () => {
    console.log(`✅ WebSocket server running at http://localhost:${port}`);
  });
}

start();
