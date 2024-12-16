import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routers from "./routers/Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {},
      }}
    >
      <Provider store={store}>
        <Routers />
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
