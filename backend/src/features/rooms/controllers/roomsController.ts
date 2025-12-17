import { rooms } from "../../../core/store/rooms.ts";
import type { User } from "../../users/models/userModel.ts";
import type { RoomModel } from "../models/roomModel.ts";

// Get All Rooms
export function getAllRooms(req: any, res: any) {
  res.send(rooms);
}

// Create a new room
export function createRoom(req: any, res: any) {
  const { id, name } = req.body as { id: string; name: string };

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
    users: [],
  };

  rooms.push(newRoom);
  res.send(newRoom);
}
