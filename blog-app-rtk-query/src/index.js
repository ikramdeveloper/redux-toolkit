import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { extendedApiSlice } from "./features/posts/posts.slice";
import { extendedUserSlice } from "./features/users/users.slice";

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(extendedUserSlice.endpoints.getUsers.initiate());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
