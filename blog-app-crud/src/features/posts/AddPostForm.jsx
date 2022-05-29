import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "./posts.slice";
import { selectAllUsers } from "../users/users.slice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);
  const onUserChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(createPost({ title, body, userId })).unwrap();
        clear();
        navigate("/");
      } catch (err) {
        console.log("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const clear = () => {
    setTitle("");
    setBody("");
    setUserId("");
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onUserChange}>
          <option value="" disabled></option>
          {usersOptions}
        </select>
        <label htmlFor="postBody">Body:</label>
        <textarea
          type="text"
          id="postBody"
          value={body}
          onChange={onBodyChange}
        />
        <button type="submit" disabled={!canSave}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
