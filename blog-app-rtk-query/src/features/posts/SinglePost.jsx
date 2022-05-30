import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectPostById } from "./posts.slice";
import { useDeletePostMutation } from "./posts.slice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [deletePost] = useDeletePostMutation();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const handleDeletePost = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
      navigate("/");
    } catch (err) {
      console.log("failed to delte post", err);
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
      <button type="button" className="deleteButton" onClick={handleDeletePost}>
        Delete Post
      </button>
    </article>
  );
};

export default SinglePost;
