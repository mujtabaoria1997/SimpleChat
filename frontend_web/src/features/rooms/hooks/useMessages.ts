import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import type { MessageModel } from "../models/roomModel";
import { addSelectedRoomMessage } from "../../../core/store/slices/roomSlice";
import type { User } from "../../users/models/userModel";
import type { Socket } from "socket.io-client";

interface UseMessagesProps {
  socket: Socket | null;
  user: User;
}

export const useMessages = ({ socket, user }: UseMessagesProps) => {
  const dispatch = useDispatch();

  const selectedRoom = useSelector((state: any) => state.room.selectedRoom);

  const messages = useSelector((state: any) => state.room.selectedRoomMessages);

  // 🔌 Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handler = (payload: {
      roomId: string;
      message: string;
      sender: User;
      timestamp: string;
    }) => {
      if (!user) return;
      const msg: MessageModel = {
        id: uuid(),
        roomId: payload.roomId,
        sender: payload.sender,
        content: payload.message,
        timestamp: payload.timestamp,
      };

      dispatch(addSelectedRoomMessage(msg));
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, dispatch]);

  // 📤 Send message
  const sendMessage = useCallback(
    (content: string) => {
      if (!socket || !selectedRoom || !user) return;

      socket.emit("sendMessage", {
        roomId: selectedRoom.id,
        message: content,
        sender: user,
      });
    },
    [socket, selectedRoom, user]
  );

  return {
    messages,
    sendMessage,
    selectedRoom,
  };
};
