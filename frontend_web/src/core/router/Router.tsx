import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";

interface RouteType {
  path: string;
  import: any;
}

const mainRoutes: RouteType[] = [
  {
    path: "/login",
    import: lazy(() => import("../../features/users/LoginPage.tsx")),
  },
  {
    path: "/",
    import: lazy(() => import("../../features/rooms/CurrentRoom.tsx")),
  },
];

export const router = createBrowserRouter(
  mainRoutes.map((e) => {
    const Component = e.import;
    return {
      path: e.path,
      element: <MainLayout children={<Component />} />,
    };
  })
);
