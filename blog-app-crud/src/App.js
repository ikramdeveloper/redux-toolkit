import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import EditPostForm from "./features/posts/EditPostForm";
import SinglePost from "./features/posts/SinglePost";
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
