import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/users.slice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => String(user.id) === String(userId));
  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default PostAuthor;
