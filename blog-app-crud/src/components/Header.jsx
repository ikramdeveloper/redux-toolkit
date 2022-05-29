import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, getCounts } from "../features/posts/posts.slice";

const Header = () => {
  const dispatch = useDispatch();
  const counts = useSelector(getCounts);

  return (
    <header className="header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="user">Users</Link>
          </li>
        </ul>
        <button
          title="Just for testing"
          onClick={() => dispatch(increaseCount())}
        >
          {counts}
        </button>
      </nav>
    </header>
  );
};

export default Header;
