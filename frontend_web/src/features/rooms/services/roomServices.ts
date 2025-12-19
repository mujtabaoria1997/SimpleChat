import api from "../../../core/services/coreApi";
import type { User } from "../../users/models/userModel";
import type { RoomModel } from "../models/roomModel";

export const roomService = {
  // Get all rooms
  getAllRooms: async (): Promise<RoomModel[]> => {
    const response = await api.get("/api/rooms");
    return response.data;
  },

  // Create a new room
  createRoom: async (id: string, name: string, user: User): Promise<RoomModel> => {
    console.log(id);
    const response = await api.post("/api/rooms/create", { id, name, user });
    return response.data;
  },

  // Join a room
  joinRoom: async (
    roomId: string,
    user: User
  ): Promise<{ message: string; room: RoomModel }> => {
    const response = await api.post("/api/rooms/join", { roomId, user });
    return response.data;
  },

  // Leave a room
  leaveRoom: async (
    roomId: string,
    userId: string
  ): Promise<{ message: string; room: RoomModel }> => {
    const response = await api.post("/api/rooms/leave", { roomId, userId });
    return response.data;
  },
};
