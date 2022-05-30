import { useAddReactionMutation } from "./posts.slice";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => (
    <button
      key={key}
      type="button"
      className="reactionButton"
      onClick={() => {
        const newValue = post.reactions[key] + 1;
        addReaction({
          postId: post.id,
          reactions: { ...post.reactions, [key]: newValue },
        });
      }}
    >
      {value} {post.reactions[key]}
    </button>
  ));
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
