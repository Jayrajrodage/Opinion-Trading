import express from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
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
  // Listen for events
  socket.on("message", (data) => {
    console.log(`📩 Message from ${socket.id}:`, data);
    // Broadcast to all clients
    io.emit("message", data);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const port = process.env.PORT || 9000;
server.listen(3000, () => {
  console.log(`websocket server running at http://localhost:${port}`);
});
