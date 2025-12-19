import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./core/services/queryClient.ts";
import { Provider } from "react-redux";
import { store } from "./core/store/store.ts";
import AppConfigProvider from "./config/AppConfigProvider.tsx";
import { App as AntDApp } from "antd";
import { RouterProvider } from "react-router-dom";
import { router } from "./core/router/Router.tsx";
import "./core/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppConfigProvider>
          <AntDApp>
            <RouterProvider router={router} />
          </AntDApp>
        </AppConfigProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
