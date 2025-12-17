import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";

// Dark mode theme
const darkColors = {
  colorBgContainer: "#1E2429",
  colorBgLayout: "#262E35",
  colorHeader: "#1E2429",
  colorTextBase: "#E4E7EB",
  colorTextSecondary: "#B0B7BE",
  colorPrimary: "#4DA6FF",
  borderRadius: 6,
};

// Light mode theme
const lightColors = {
  colorBgContainer: "#F7F9FB",
  colorBgLayout: "#FFFFFF",
  colorHeader: "#F7F9FB",
  colorTextBase: "#1E2429",
  colorTextSecondary: "#5A6372",
  colorPrimary: "#4DA6FF",
  borderRadius: 6,
};

interface Props {
  children?: any;
}

function AppConfigProvider({ children }: Props) {
  const darkMode = useSelector((state: any) => state.theme.darkMode);
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: darkMode ? darkColors : lightColors,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AppConfigProvider;
