import { theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  setSidebar,
  setTheme,
  toggleSidebar,
  toggleTheme,
} from "../store/slices/themeSlice";

const useTheme = () => {
  // Dispatch for Redux Functions
  const dispatch = useDispatch();

  // Main Theme
  const { token } = theme.useToken();

  // Theme Slice
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  const sidebarCollapsed = useSelector(
    (state: any) => state.theme.sidebarCollapsed
  );

  // Main Theme Functions
  const toggleThemeMode = () => dispatch(toggleTheme());
  const setThemeMode = (darkMode: boolean) => setTheme(darkMode);

  // Sidebar Functions
  const toggleSidebarFn = () => dispatch(toggleSidebar());
  const setSidebarFn = (state: boolean) => dispatch(setSidebar(state));

  return {
    colorBgLayout: token.colorBgLayout,
    colorBgContainer: token.colorBgContainer,
    borderRadiusLG: token.borderRadiusLG,
    darkMode,
    sidebarCollapsed,
    toggleThemeMode,
    setThemeMode,
    toggleSidebarFn,
    setSidebarFn,
    token,
  };
};

export default useTheme;
