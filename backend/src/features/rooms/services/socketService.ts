import { Server } from "socket.io";
import type { User } from "../../users/models/userModel.ts";
import { rooms } from "../../../core/store/rooms.ts";

export const onlineUsers: Map<string, string> = new Map(); // userId -> socketId

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User sends their identity to register connection
    socket.on("register", (user: User) => {
      onlineUsers.set(user.id, socket.id);
      console.log(
        `User ${user.username} registered with socket ${socket.id},\n${rooms.length}`,
      );
    });

    // Send message to a room
    socket.on(
      "sendMessage",
      ({
        roomId,
        message,
        sender,
      }: {
        roomId: string;
        message: string;
        sender: User;
      }) => {
        const room = rooms.find((r) => r.id === roomId);
        if (!room) return;

        room.users.forEach((u) => {
          const socketId = onlineUsers.get(u.id);
          if (socketId) {
            io.to(socketId).emit("newMessage", {
              roomId,
              message,
              sender,
              timestamp: new Date().toISOString(),
            });
          }
        });
      },
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Find the userId associated with this socket
      let disconnectedUserId: string | null = null;
      for (const [userId, sId] of onlineUsers) {
        if (sId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (!disconnectedUserId) return;

      rooms.forEach((room, index) => {
        room.users = room.users.filter((u) => u.id !== disconnectedUserId);
        room.users.forEach((u) => {
          const userSocketId = onlineUsers.get(u.id);
          if (userSocketId) {
            io.to(userSocketId).emit("updateUsers", {
              room,
            });
          }
        });
      });

      console.log(`User ${disconnectedUserId} removed from rooms`);
    });
  });
}
