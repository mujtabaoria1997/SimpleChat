import { useEffect, useRef, useState, useCallback } from "react";
import { io, type Socket } from "socket.io-client";
import { SOCKET_URL } from "../services/coreApi";
import type { User } from "../../features/users/models/userModel";
import { useDispatch } from "react-redux";
import { updateRoom } from "../store/slices/roomSlice";
import type { RoomModel } from "../../features/rooms/models/roomModel";

export const useSocket = (user: User) => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    // Initialize socket only once
    if (!socketRef.current) {
      const socket = io(SOCKET_URL);

      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        setConnected(true);

        // Register user with backend
        socket.emit("register", user);
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });

      // Listen for user list updates per room
      socket.on("updateUsers", ({ room }: { room: RoomModel }) => {
        console.log(room);
        dispatch(updateRoom(room));
      });

      socketRef.current = socket;
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [user]);

  const sendMessage = useCallback(
    (roomId: string, message: string) => {
      if (socketRef.current && user) {
        socketRef.current.emit("sendMessage", {
          roomId,
          message,
          senderId: user.id,
        });
      }
    },
    [user]
  );

  const onMessage = useCallback(
    (
      callback: (msg: {
        roomId: string;
        message: string;
        senderId: string;
        timestamp: string;
      }) => void
    ) => {
      socketRef.current?.on("newMessage", callback);
    },
    []
  );

  const getSocket = () => socketRef.current;

  return { getSocket, connected, sendMessage, onMessage };
};
