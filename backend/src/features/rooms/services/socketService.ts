import { Server } from "socket.io";
import type { User } from "../../users/models/userModel.ts";
import { rooms } from "../../../core/store/rooms.ts";

const onlineUsers: Map<string, string> = new Map(); // userId -> socketId

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User sends their identity to register connection
    socket.on("register", (user: User) => {
      onlineUsers.set(user.id, socket.id);
      console.log(`User ${user.username} registered with socket ${socket.id}`);
    });

    // Send message to a room
    socket.on("sendMessage", ({ roomId, message, senderId }: { roomId: string; message: string; senderId: string }) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;

      room.users.forEach(u => {
        const socketId = onlineUsers.get(u.id);
        if (socketId) {
          io.to(socketId).emit("newMessage", { roomId, message, senderId, timestamp: new Date().toISOString() });
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      // Remove user from online map
      for (const [userId, sId] of onlineUsers) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}
