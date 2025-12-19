import { Router } from "express";
import { 
  createRoom, 
  getAllRooms, 
  joinRoom, 
  leaveRoom 
} from "../features/rooms/controllers/roomsController.ts";

const router = Router();

// Health check
router.get("/", (req: any, res: any) => {
  res.send("Server is running");
});

// Get all rooms
router.get("/api/rooms", getAllRooms);

// Create a new room
router.post("/api/rooms/create", createRoom);

// Join a room
router.post("/api/rooms/join", joinRoom);

// Leave a room
router.post("/api/rooms/leave", leaveRoom);

export { router };
