import { createSlice } from "@reduxjs/toolkit";

// ---- helpers ----
const getInitialThemeMode = () => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return JSON.parse(stored);
  return false;
};

const getInitialSidebarState = () => {
  const stored = localStorage.getItem("sidebarCollapsed");
  if (stored !== null) return JSON.parse(stored);
  return false;
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: getInitialThemeMode(),
    sidebarCollapsed: getInitialSidebarState(),
  },
  reducers: {
    // theme
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
    setTheme: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },

    // sidebar
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem(
        "sidebarCollapsed",
        JSON.stringify(state.sidebarCollapsed)
      );
    },
    setSidebar: (state, action) => {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem(
        "sidebarCollapsed",
        JSON.stringify(state.sidebarCollapsed)
      );
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebar,
} = themeSlice.actions;

export default themeSlice.reducer;
