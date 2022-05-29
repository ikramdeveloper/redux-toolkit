import { useDispatch } from "react-redux";
import { addReaction } from "./posts.slice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => (
    <button
      key={key}
      type="button"
      className="reactionButton"
      onClick={() => dispatch(addReaction({ postId: post.id, reaction: key }))}
    >
      {value} {post.reactions[key]}
    </button>
  ));
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
