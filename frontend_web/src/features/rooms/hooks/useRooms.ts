import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { User } from "../../users/models/userModel";
import type { RoomModel } from "../models/roomModel";
import { roomService } from "../services/roomServices";
import {
  setRooms,
  addRoom,
  selectRoom as selectRoomAction,
  updateRoom,
  removeRoom,
  toggleJoin,
} from "../../../core/store/slices/roomSlice";
import { useAuth } from "../../users/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const useRooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state: any) => state.room.rooms) as RoomModel[];
  const { user } = useAuth();
  const selectedRoom = useSelector(
    (state: any) => state.room.selectedRoom
  ) as RoomModel | null;
  const queryClient = useQueryClient();

  const fetchRooms = useCallback(async () => {
    const data = await roomService.getAllRooms();
    dispatch(setRooms(data));
    return data;
  }, [dispatch]);

  const createRoom = useCallback(
    async (id: string, name: string) => {
      const newRoom = await roomService.createRoom(id, name, user);
      dispatch(addRoom(newRoom));
      queryClient.invalidateQueries();
      return newRoom;
    },
    [dispatch, user, queryClient]
  );

  const joinRoom = useCallback(
    async (roomId: string, user: User) => {
      const result = await roomService.joinRoom(roomId, user);
      dispatch(updateRoom(result.room));
      return result;
    },
    [dispatch]
  );

  const leaveRoom = useCallback(
    async (roomId: string, userId: string) => {
      const result = await roomService.leaveRoom(roomId, userId);
      if (result.room.users.length === 0) {
        dispatch(removeRoom(roomId));
      } else {
        dispatch(updateRoom(result.room));
      }
      return result;
    },
    [dispatch]
  );

  const selectRoom = useCallback(
    (roomId: string) => {
      dispatch(selectRoomAction(roomId));
    },
    [dispatch]
  );

  const toggleJoinFn = () => dispatch(toggleJoin());

  return {
    rooms,
    selectedRoom,
    fetchRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    selectRoom,
    toggleJoinFn,
  };
};
