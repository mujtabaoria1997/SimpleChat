import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";

interface RouteType {
  path: string;
  import: any;
}

const mainRoutes: RouteType[] = [
    {
      path: "/",
      import: lazy(() => import("../../features/home/Homepage.tsx")),
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
