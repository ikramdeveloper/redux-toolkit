import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import SinglePost from "./features/posts/SinglePost";
import UsersList from "./features/users/UsersList";
import SingleUser from "./features/users/SingleUser";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePost />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>

          <Route path="user">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<SingleUser />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
