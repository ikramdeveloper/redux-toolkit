import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import "./index.css";
import App from "./App";
import { apiSlice } from "./features/api/api.slice";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ApiProvider api={apiSlice}>
    <App />
  </ApiProvider>
);
