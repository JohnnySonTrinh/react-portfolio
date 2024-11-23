import { Link } from "react-router-dom";
import "../../styles/notFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>LOOKS LIKE YOU ARE </h2>
      <h2>LOST IN SPACE</h2>
      <Link to="/" className="home-button">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
