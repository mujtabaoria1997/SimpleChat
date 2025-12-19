import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../../features/users/models/userModel";
import CookieService from "../../services/cookieService";

const getInitialUser = (): User | null => {
  const stored = CookieService.get("currentUser");
  if (stored) return JSON.parse(stored);
  return null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
    isAuthenticated: !!getInitialUser(),
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      CookieService.set("currentUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      CookieService.remove("currentUser");
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      CookieService.set("currentUser", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
