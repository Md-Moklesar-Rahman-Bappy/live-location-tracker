import { Server, Socket } from "socket.io";
import { logger } from "../utils/logger";

export function initializeSockets(io: Server) {
  io.on("connection", (socket: Socket) => {
    logger.info({ socketId: socket.id }, "Socket connected");

    socket.on("tracking:join-owner", (data: { trackingSessionId: string }) => {
      logger.info({ sessionId: data.trackingSessionId, socketId: socket.id }, "Owner joined tracking room");
      socket.join(`tracking:${data.trackingSessionId}:owner`);
    });

    socket.on("tracking:join-viewer", (data: { publicId: string; token: string }) => {
      logger.info({ publicId: data.publicId, socketId: socket.id }, "Viewer requested room");
      socket.join(`tracking:${data.publicId}:viewer`);
    });

    socket.on("location:update", (data: { trackingSessionId: string; location: unknown }) => {
      logger.info({ trackingSessionId: data.trackingSessionId, socketId: socket.id }, "Location update received");
      io.to(`tracking:${data.trackingSessionId}:viewer`).emit("location:updated", data);
    });

    socket.on("tracking:stop", (data: { trackingSessionId: string }) => {
      logger.info({ trackingSessionId: data.trackingSessionId, socketId: socket.id }, "Tracking stopped");
      io.to(`tracking:${data.trackingSessionId}:viewer`).emit("tracking:stopped", { trackingSessionId: data.trackingSessionId });
      socket.leave(`tracking:${data.trackingSessionId}:owner`);
    });

    socket.on("tracking:leave", (data?: { trackingSessionId?: string }) => {
      if (data?.trackingSessionId) {
        socket.leave(`tracking:${data.trackingSessionId}:owner`);
      }
      logger.info({ socketId: socket.id }, "Left tracking room");
    });

    socket.on("disconnect", () => {
      logger.info({ socketId: socket.id }, "Socket disconnected");
    });
  });
}
