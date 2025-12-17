import type { User } from "../../users/models/userModel.ts";

export interface RoomModel {
  id: string;
  name: string;
  users: User[];
}
