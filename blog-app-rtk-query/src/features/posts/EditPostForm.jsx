import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectPostById } from "./posts.slice";
import { useUpdatePostMutation } from "./posts.slice";
import { selectAllUsers } from "../users/users.slice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onUserChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, body, userId].every(Boolean) && !isLoading;

  const savePost = async (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        await updatePost({ id: post.id, title, body, userId }).unwrap();
        setTitle("");
        setBody("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("Failed to save the post", err);
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={savePost}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" defaultValue={userId} onChange={onUserChanged}>
          <option value="" disabled></option>
          {userOptions}
        </select>
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          cols="30"
          rows="10"
          value={body}
          onChange={onBodyChanged}
        />
        <button type="submit" disabled={!canSave}>
          Save
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
