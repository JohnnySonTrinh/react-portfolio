import { useRef } from "react";
import { Link } from "react-router-dom";
import useWebGLAnimation from "../../hooks/useWebGLAninimation";
import MusicPlayer from "../../components/music/MusicPlayer";
import "../../styles/notFound.css";

const NotFound = () => {
  const canvasRef = useRef(null);
  const audioData = useRef(0);

  useWebGLAnimation(canvasRef, audioData);

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>LOOKS LIKE YOU ARE</h2>
      <h2>LOST</h2>
      <MusicPlayer audioData={audioData} />
      <canvas ref={canvasRef} tabIndex={0}/>
      <Link to="/" className="home-button">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
