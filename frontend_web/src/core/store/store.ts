import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlice,
  },
});
