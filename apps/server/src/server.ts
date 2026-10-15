import { createServer } from "http";
import { Server } from "socket.io";
import { config, isProduction } from "./config";
import app from "./app";
import { logger } from "./utils/logger";

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.APP_ORIGIN,
    credentials: true,
  },
  maxHttpBufferSize: config.SOCKET_MAX_PAYLOAD_BYTES,
});

import { initializeSockets } from "./sockets/index";

io.on("connection", (socket) => {
  logger.info({ socketId: socket.id }, "Socket connected");
  socket.on("disconnect", () => {
    logger.info({ socketId: socket.id }, "Socket disconnected");
  });
});

initializeSockets(io);

const PORT = config.PORT;
server.listen(PORT, () => {
  logger.info({ port: PORT, env: config.NODE_ENV }, "Server started");
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
