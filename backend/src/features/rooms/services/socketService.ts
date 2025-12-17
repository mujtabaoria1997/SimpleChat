import { Server, Socket } from "socket.io";
import type { User } from "../../users/models/userModel";
import { rooms } from "../../../core/store/rooms.ts";

export function setupSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Join a room
    socket.on("joinRoom", ({ roomId, user }: { roomId: string; user: User }) => {
      const room = rooms.find(r => r.id === roomId);
      if (!room) return;

      // Add user if not exists
      if (!room.users.find(u => u.id === user.id)) {
        room.users.push(user);
      }

      socket.join(roomId);
      io.to(roomId).emit("updateUsers", room.users);
      console.log(`${user.username} joined room ${room.name}`);
    });

    // Exit a room
    socket.on("exitRoom", ({ roomId, userId }: { roomId: string; userId: string }) => {
      const roomIndex = rooms.findIndex(r => r.id === roomId);
      if (roomIndex === -1) return;

      const room = rooms[roomIndex]!;
      room.users = room.users.filter(u => u.id !== userId);

      socket.leave(roomId);

      // Delete room if empty
      if (room.users.length === 0) {
        rooms.splice(roomIndex, 1);
      } else {
        io.to(roomId).emit("updateUsers", room.users);
      }

      console.log(`User ${userId} left room ${room.name}`);
    });

    // Handle sending message
    socket.on("sendMessage", ({ roomId, message }: { roomId: string; message: string }) => {
      io.to(roomId).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
