import { Layout, Spin } from "antd";
import { Suspense } from "react";
import useTheme from "../hooks/useTheme";

const { Content } = Layout;

const MainLayout = ({ children }: { children: any }) => {
  const { colorBgContainer, borderRadiusLG } = useTheme();

  // Main Layout
  const layout = (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
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
