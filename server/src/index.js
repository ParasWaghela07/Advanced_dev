import dotenv from "dotenv";

dotenv.config();

import http from "http";

import app from "./app.js";

import { Server } from "socket.io";

import { connectDB } from "./config/db.js";

import { connectRedis } from "./config/redis.js";

import "./workers/email.worker.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

await connectDB();

await connectRedis();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {

  console.log(
    `User Connected: ${socket.id}`
  );

  // 🔥 join personal room
  socket.on("joinRoom", (userId) => {

    socket.join(userId);

    console.log(
      `User joined room: ${userId}`
    );

  });

  socket.on("disconnect", () => {

    console.log(
      `User Disconnected: ${socket.id}`
    );

  });

});

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
