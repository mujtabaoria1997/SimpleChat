import { Router } from "express";
import { createRoom, getAllRooms} from "../features/rooms/controllers/roomsController.ts";
import { rooms } from "../core/store/rooms.ts";

const router = Router();

router.get("/", (req: any, res: any) => {
  res.send("Server is running");
});

// Get all rooms
router.get("/api/rooms", getAllRooms);

// Create a new room
router.post("/api/rooms", createRoom);


export { router };
