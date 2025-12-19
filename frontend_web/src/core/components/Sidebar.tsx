import { Grid, Layout, Menu, type MenuProps } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import useTheme from "../hooks/useTheme";
import { MessageOutlined } from "@ant-design/icons";
import { useRooms } from "../../features/rooms/hooks/useRooms";

type MenuItem = Required<MenuProps>["items"][number];
const { Sider } = Layout;
const { useBreakpoint } = Grid;

const Sidebar = () => {
  const {
    colorBgLayout,
    borderRadiusLG,
    sidebarCollapsed,
    token,
    setSidebarFn,
  } = useTheme();
  const { rooms, selectRoom, toggleJoinFn, selectedRoom } = useRooms();

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  // Rooms
  const room: MenuItem[] = rooms.map((r) => {
    // Main Room Menu
    const roomMenu: MenuItem = {
      key: r.id,
      label: r.name,
      onClick: () => selectRoom(r.id),
      style: {
        borderBottom: `1px solid ${token.colorBorder}`,
        padding: "8px 16px",
      },
    };

    return roomMenu;
  });

  // Main Menu
  const mainMenu = (
    <Menu
      mode="inline"
      selectedKeys={[selectedRoom?.id ?? ""]}
      style={{
        borderRadius: borderRadiusLG,
        height: "100%",
      }}
      items={[
        {
          key: "add_chat",
          label: "Public Room",
          icon: <MessageOutlined />,
          onClick: () => toggleJoinFn(),
        },
        {
          key: "add_chat_divider",
          type: "divider",
        },
        ...room,
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
