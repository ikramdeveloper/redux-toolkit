import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { selectPostById, deletePost } from "./posts.slice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const handleDeletePost = () => {
    try {
      dispatch(deletePost(post));
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
