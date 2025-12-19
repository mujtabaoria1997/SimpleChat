import { rooms } from "../../../core/store/rooms.ts";
import { io } from "../../../index.ts";
import type { User } from "../../users/models/userModel.ts";
import type { RoomModel } from "../models/roomModel.ts";
import { onlineUsers } from "../services/socketService.ts";

// Get All Rooms
export function getAllRooms(req: any, res: any) {
  res.send(rooms);
}

// Create a new room
export function createRoom(req: any, res: any) {
  const { id, name, user } = req.body as {
    id: string;
    name: string;
    user: User;
  };

  if (!id || !name) {
    return res.status(400).send({ error: "Room id and name are required" });
  }

  const exists = rooms.find((r) => r.id === id);
  if (exists) {
    return res.status(400).send({ error: "Room with this id already exists" });
  }

  const newRoom: RoomModel = {
    id,
    name,
    users: [user],
  };

  rooms.push(newRoom);
  res.send(newRoom);
  console.log(rooms);
}

// Join a room
export function joinRoom(req: any, res: any) {
  const { roomId, user } = req.body as { roomId: string; user: User };

  if (!roomId || !user?.id) {
    return res.status(400).send({ error: "Room id and user are required" });
  }

  const room = rooms.find((r) => r.id === roomId);
  if (!room) {
    return res.status(404).send({ error: "Room not found" });
  }

  if (!room.users.find((u) => u.id === user.id)) {
    room.users.push(user);
  }

  room.users.forEach((u) => {
    const socketId = onlineUsers.get(u.id);
    if (socketId) {
      io.to(socketId).emit("updateUsers", {
        room,
      });
    }
  });

  res.send({ message: `${user.username} joined room ${room.name}`, room });
}

// Leave Room
export function leaveRoom(req: any, res: any) {
  const { roomId, userId } = req.body as { roomId: string; userId: string };

  if (!roomId || !userId) {
    return res.status(400).send({ error: "Room id and userId are required" });
  }

  const room = rooms.find((r) => r.id === roomId);
  if (!room) {
    return res.status(404).send({ error: "Room not found" });
  }

  room.users = room.users.filter((u) => u.id !== userId);

  if (room.users.length === 0) {
    const index = rooms.findIndex((r) => r.id === roomId);
    rooms.splice(index, 1);
  }

  res.send({ message: `User left room ${room.name}`, room });
}
