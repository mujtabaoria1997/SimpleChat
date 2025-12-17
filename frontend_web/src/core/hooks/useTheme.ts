import { theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleTheme } from "../store/slices/themeSlice";

const useTheme = () => {
  // Dispatch for Redux Functions
  const dispatch = useDispatch();

  // Main Theme
  const { token } = theme.useToken();

  // Theme Slice
  const darkMode = useSelector((state: any) => state.theme.darkMode);

  // Main Theme Functions
  const toggleThemeMode = () => dispatch(toggleTheme());
  const setThemeMode = (darkMode: boolean) => setTheme(darkMode);

  return {
    colorBgLayout: token.colorBgLayout,
    colorBgContainer: token.colorBgContainer,
    borderRadiusLG: token.borderRadiusLG,
    darkMode,
    toggleThemeMode,
    setThemeMode,
    token,
  };
};

export default useTheme;
