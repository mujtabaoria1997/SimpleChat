import type { User } from "../../users/models/userModel.ts";

export interface RoomModel {
  id: string;
  name: string;
  users: User[];
}

export interface MessageModel {
  id: string;
  roomId: string;
  sender: User;
  content: string;
  timestamp: string;
}
