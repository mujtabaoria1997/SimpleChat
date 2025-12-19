import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  RoomModel,
  MessageModel,
} from "../../../features/rooms/models/roomModel";

interface RoomState {
  rooms: RoomModel[];
  selectedRoom: RoomModel | null;
  selectedRoomMessages: MessageModel[];
  showJoin: boolean;
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  selectedRoomMessages: [],
  showJoin: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<RoomModel[]>) => {
      state.rooms = action.payload;
    },

    addRoom: (state, action: PayloadAction<RoomModel>) => {
      state.rooms.push(action.payload);
    },

    selectRoom: (state, action: PayloadAction<string>) => {
      state.selectedRoom =
        state.rooms.find((r) => r.id === action.payload) || null;

      // reset messages when switching rooms
      state.selectedRoomMessages = [];
    },

    updateRoom: (state, action: PayloadAction<RoomModel>) => {
      const index = state.rooms.findIndex((r) => r.id === action.payload.id);
      console.log();
      if (index !== -1) {
        state.rooms[index] = action.payload;

        if (state.selectedRoom?.id === action.payload.id) {
          state.selectedRoom = action.payload;
        }
      } else {
        state.rooms.push(action.payload);
      }
    },

    removeRoom: (state, action: PayloadAction<string>) => {
      state.rooms = state.rooms.filter((r) => r.id !== action.payload);

      if (state.selectedRoom?.id === action.payload) {
        state.selectedRoom = null;
        state.selectedRoomMessages = [];
      }
    },

    // set full message list (history, reload, etc.)
    setSelectedRoomMessages: (state, action: PayloadAction<MessageModel[]>) => {
      state.selectedRoomMessages = action.payload;
    },

    // add message ONLY for selected room
    addSelectedRoomMessage: (state, action: PayloadAction<MessageModel>) => {
      if (state.selectedRoom?.id === action.payload.roomId) {
        state.selectedRoomMessages.push(action.payload);
      }
    },

    // optional cleanup
    clearSelectedRoomMessages: (state) => {
      state.selectedRoomMessages = [];
    },

    // Toggle Join Dialog
    toggleJoin: (state) => {
      state.showJoin = !state.showJoin;
    },
  },
});

export const {
  setRooms,
  addRoom,
  selectRoom,
  updateRoom,
  removeRoom,
  setSelectedRoomMessages,
  addSelectedRoomMessage,
  clearSelectedRoomMessages,
  toggleJoin,
} = roomSlice.actions;

export default roomSlice.reducer;
