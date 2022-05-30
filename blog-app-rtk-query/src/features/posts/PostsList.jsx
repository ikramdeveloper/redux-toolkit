import { useSelector } from "react-redux";
import { selectPostIds } from "./posts.slice";
import { useGetPostsQuery } from "./posts.slice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

  const orderedPostIds = useSelector(selectPostIds);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>There is an error in Posts List: {error}</p>;
  } else {
    content = "I have nothing to display";
  }

  return <section>{content}</section>;
};

export default PostsList;
