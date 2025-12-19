import { Layout, Spin } from "antd";
import { Suspense } from "react";
import useTheme from "../hooks/useTheme";
import { useWindowSize } from "react-use";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

const MainLayout = ({ children }: { children: any }) => {
  const { colorBgContainer, borderRadiusLG } = useTheme();
  const { height } = useWindowSize();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  // Main Content
  const content = (
    <Layout>
      {/* Main Contain */}
      <Content
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: "10px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );

  // Main Layout
  const layout = (
    <Layout
      style={{
        minHeight: height,
        padding: 5,
      }}
    >
      {/* App Header */}
      {!isLogin && <AppHeader />}

      <Layout>
        {/* App Sidebar */}
        {!isLogin && <Sidebar />}

        {/* Main Layout */}
        {content}
      </Layout>
    </Layout>
  );

  // Children with Loading
  const suspense = (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }
    >
      {layout}
    </Suspense>
  );

  return suspense;
};

export default MainLayout;
