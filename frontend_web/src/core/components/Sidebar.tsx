import { Grid, Layout, Menu, type MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { useLocation, NavLink } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useWindowSize } from "react-use";
import { MessageOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;
const { useBreakpoint } = Grid;

interface ItemProp {
  link?: string;
  icon?: any;
  label: string;
}

// Main / Dashboard Items
const chatMenuItems: ItemProp[] = [
  {
    link: "/rooms/123",
    label: "My Rooms",
  },
  {
    link: "/rooms/124",
    label: "My Chats",
  },
];

const getMenu = (
  label: React.ReactNode,
  link: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key: link,
  icon,
  children,
  label: <NavLink to={link} children={label} />,
});

const Sidebar = () => {
  const { colorBgLayout, borderRadiusLG, sidebarCollapsed, setSidebarFn } =
    useTheme();
  const location = useLocation();

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  // Main / Dashboard Menus
  const chatMenus = chatMenuItems.map((item) => {
    return getMenu(item.label, item.link!);
  });

  // Rooms
  const room = [];

  // Main Menu
  const mainMenu = (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{
        borderRadius: borderRadiusLG,
        height: "100%",
      }}
      items={[
        {
          key: "add_chat",
          label: "Public Room",
          icon: <MessageOutlined />
        },
        {
          key: "add_chat_divider",
          type: "divider",
        },
        ...chatMenus,
      ]}
    />
  );

  return (
    <Sider
      breakpoint="sm"
      trigger={null}
      unselectable="on"
      collapsed={isMobile ? sidebarCollapsed : false}
      collapsedWidth={isMobile ? 0 : "60px"}
      width={200}
      style={{
        background: colorBgLayout,
        paddingBottom: "4px",
        position: isMobile ? "fixed" : undefined,
        zIndex: isMobile ? 1000 : undefined,
      }}
      onBreakpoint={(broken) => {
        if (broken) {
          setSidebarFn(true);
        } else {
          setSidebarFn(false);
        }
      }}
    >
      {/* Main Menu */}
      {mainMenu}
    </Sider>
  );
};

export default Sidebar;
