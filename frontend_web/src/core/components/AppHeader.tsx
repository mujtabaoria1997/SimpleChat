import { Button, Grid, Layout } from "antd";
import useTheme from "../hooks/useTheme";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../features/users/hooks/useAuth";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const AppHeader = () => {
  const {
    darkMode,
    toggleThemeMode,
    colorBgContainer,
    colorBgLayout,
    borderRadiusLG,
    sidebarCollapsed,
    toggleSidebarFn,
  } = useTheme();
  const { logoutFn } = useAuth();

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        background: colorBgContainer,
        borderBottom: "4px solid " + colorBgLayout,
        borderRadius: borderRadiusLG,
        border: "10 grey",
      }}
    >
      {/* Menu Toggle */}
      {isMobile && (
        <Button
          type="text"
          icon={
            sidebarCollapsed || isMobile ? (
              <MenuUnfoldOutlined style={{ fontSize: 20 }} />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 20 }} />
            )
          }
          onClick={() => toggleSidebarFn()}
        />
      )}

      <div
        style={{
          width: 200,
          fontWeight: "bold",
          fontSize: 16,
          textAlign: "center",
        }}
      >
        Simple Chat
      </div>

      <ThemeSwitcher
        darkMode={darkMode!}
        toggleThemeMode={() => {
          toggleThemeMode();
        }}
      />
      <Button
        type="text"
        icon={
          <LogoutOutlined
            style={{
              fontSize: 24,
            }}
          />
        }
        onClick={() => logoutFn()}
      />
    </Header>
  );
};

export default AppHeader;
