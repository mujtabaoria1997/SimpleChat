import express from "express";
import http from "http";
import { router } from "./config/router.ts";
import { Server } from "socket.io";
import { setupSocket } from "./features/rooms/services/socketService.ts";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:9200" } });

// Use cors
app.use(
  cors({
    origin: ["http://localhost:9200"],
  }),
);

app.use("/", router);

// Setup WebSocket
setupSocket(io);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
