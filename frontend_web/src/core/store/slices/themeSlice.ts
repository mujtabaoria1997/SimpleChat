import { createSlice } from "@reduxjs/toolkit";

// Initialized Theme Mode
const getInitialThemeMode = () => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return JSON.parse(stored);
  return false;
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: getInitialThemeMode() },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
