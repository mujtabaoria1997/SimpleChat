import { Card, Typography, Input, Space, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";

import { useSocket } from "../../core/hooks/useSocket";
import { useAuth } from "../users/hooks/useAuth";
import { useMessages } from "./hooks/useMessages";
import { useSelector } from "react-redux";

import RoomMessages from "./components/RoomMessages";
import { useState } from "react";

const { Title, Text } = Typography;

const CurrentRoom = () => {
  const { user } = useAuth();
  const { getSocket } = useSocket(user);
  const socket = getSocket();
  const [msg, setMsg] = useState("");

  const { messages, sendMessage } = useMessages({
    socket,
    user,
  });

  const selectedRoom = useSelector((state: any) => state.room.selectedRoom);

  // no room selected
  if (!selectedRoom) {
    return (
      <Card
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text type="secondary">
          Select a room from the left or join one to start chatting 💬
        </Text>
      </Card>
    );
  }

  const roomName = selectedRoom.name;
  const membersCount = selectedRoom.users.length;

  // send handler
  const handleSend = (value: string) => {
    if (!value.trim()) return;
    sendMessage(value);
    setMsg("");
  };

  return (
    <Card style={{ display: "flex", flexDirection: "column", }}>
      {/* Header */}
      <Space
        style={{
          justifyContent: "space-between",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 12,
          display: "flex",
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0 }}>
            {roomName}
          </Title>
          <Text type="secondary">{membersCount} members</Text>
        </div>

        <Avatar.Group max={{ count: 5 }}>
          {selectedRoom.users.map((u: any) => (
            <Avatar key={u.id} icon={<UserOutlined />} />
          ))}
        </Avatar.Group>
      </Space>

      {/* Body */}
      <RoomMessages messages={messages} currentUserId={user.id} />

      {/* Send Message Input */}
      <div style={{ marginTop: 12, width: "100%", flex: 1 }}>
        <Input.Search
          placeholder="Type a message..."
          enterButton={<SendOutlined />}
          value={msg}
          onChange={(v) => setMsg(v.currentTarget.value)}
          onSearch={handleSend}
          style={{
            flex: 1,
          }}
        />
      </div>
    </Card>
  );
};

export default CurrentRoom;
