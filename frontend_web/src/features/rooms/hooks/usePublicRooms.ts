import { useQuery } from "@tanstack/react-query";
import type { RoomModel } from "../models/roomModel";
import { roomService } from "../services/roomServices";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleJoin } from "../../../core/store/slices/roomSlice";

export const usePublicRooms = () => {
  const { showJoin } = useSelector((state: any) => state.room);
  const [room, setRoom] = useState<RoomModel | null>(null);
  const dispatch = useDispatch();

  // Fetch public rooms
  const {
    data: rooms,
    isLoading,
    error,
    refetch,
  } = useQuery<RoomModel[]>({
    queryKey: ["public-rooms"],
    queryFn: roomService.getAllRooms,
  });

  const cancelDlg = () => {
    dispatch(toggleJoin());
  };

  return {
    rooms,
    isLoading,
    error,
    refetch,
    showJoin,
    room,
    setRoom,
    cancelDlg,
  };
};
