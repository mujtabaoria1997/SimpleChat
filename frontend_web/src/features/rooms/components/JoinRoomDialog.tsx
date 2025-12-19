import { Modal, Button, Radio, Tabs, Input, Form, message } from "antd";
import { useState } from "react";
import { usePublicRooms } from "../hooks/usePublicRooms";
import { useRooms } from "../hooks/useRooms";
import { useAuth } from "../../users/hooks/useAuth";

const JoinRoomDialog = () => {
  const { user } = useAuth();
  const { rooms, showJoin, room, setRoom, cancelDlg } = usePublicRooms();
  const { joinRoom, createRoom } = useRooms();
  const [newRoomName, setNewRoomName] = useState("");

  if (!user) return null; // safety check

  const handleJoin = async () => {
    if (!room) return;
    try {
      await joinRoom(room.id, user);
      cancelDlg();
      message.success(`Joined room "${room.name}"`);
    } catch (err) {
      console.error("Failed to join room:", err);
      message.error("Failed to join room");
    }
  };

  const handleCreate = async () => {
    if (!newRoomName.trim()) return;
    try {
      const id = crypto.randomUUID();
      await createRoom(id, newRoomName);
      setNewRoomName("");
      message.success(`Room "${newRoomName}" created`);
      cancelDlg();
    } catch (err) {
      console.error("Failed to create room:", err);
      message.error("Failed to create room");
    }
  };

  // Join Public Room Tab
  const joinRoomTab = (
    <>
      <Radio.Group
        value={room?.id}
        onChange={(e) => {
          const selected = rooms?.find((r) => r.id === e.target.value) || null;
          setRoom(selected);
        }}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {rooms?.map((r) => (
          <Radio key={r.id} value={r.id}>
            {r.name} ({r.users.length} members)
          </Radio>
        ))}
      </Radio.Group>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button onClick={cancelDlg}>Cancel</Button>
        <Button type="primary" onClick={handleJoin} disabled={!room}>
          Join
        </Button>
      </div>
    </>
  );

  // Create New Room Tab
  const createNewRoomTab = (
    <Form layout="vertical">
      <Form.Item label="Room Name">
        <Input
          placeholder="Enter room name"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          onClick={handleCreate}
          disabled={!newRoomName.trim()}
        >
          Create
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <Modal
      open={showJoin}
      title="Rooms"
      onCancel={cancelDlg}
      footer={null}
      style={{ minHeight: "300px" }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "join_room",
            label: "Join Room",
            children: joinRoomTab,
          },
          {
            key: "create_room",
            label: "Create Room",
            children: createNewRoomTab,
          },
        ]}
      ></Tabs>
    </Modal>
  );
};

export default JoinRoomDialog;
