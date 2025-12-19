import { useRef, useEffect } from "react";
import useTheme from "../../../core/hooks/useTheme";
import type { MessageModel } from "../models/roomModel";
import { useWindowSize } from "react-use";

interface Props {
  messages: MessageModel[];
  currentUserId: string;
}

const RoomMessages = ({ messages, currentUserId }: Props) => {
  const { token } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        marginTop: 12,
        overflowY: "auto",
        gap: 8,
        height: height - 260
      }}
    >
      {messages.map((msg) => {
        const senderId =
          typeof msg.sender === "string" ? msg.sender : msg.sender.id;
        const senderName =
          typeof msg.sender === "string" ? msg.sender : msg.sender.username;

        const isMine = senderId === currentUserId;

        return (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: isMine ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "8px 12px",
                borderRadius: 8,
                background: isMine ? token.colorPrimary : token.colorBgLayout,
              }}
            >
              {!isMine && (
                <span style={{ fontWeight: 600, display: "block" }}>
                  {senderName}
                </span>
              )}
              <span>{msg.content}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomMessages;
