import React from "react";
import { Card, Input, Button, Typography, Alert } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import type { User } from "./models/userModel";

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const { name, setName, error, loginFn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user: User = {
      id: crypto.randomUUID(),
      username: name,
    };

    loginFn(user);

    if (name) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card style={{ width: 360, padding: 24 }} variant={"outlined"}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Welcome 👋
        </Title>

        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Input
          size="large"
          placeholder="Enter your name"
          prefix={<UserOutlined />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onPressEnter={handleLogin}
          style={{ marginBottom: 16 }}
        />

        <Button
          type="primary"
          size="large"
          block
          icon={<LoginOutlined />}
          onClick={handleLogin}
        >
          Enter
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;
