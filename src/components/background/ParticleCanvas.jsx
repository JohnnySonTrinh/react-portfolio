import "../../styles/particle-effects.css";
import useParticleCanvas from "../../hooks/useParticleCanvas";

const ParticleCanvas = () => {
  const { canvasRef, showParticles } = useParticleCanvas();

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        display: showParticles ? "block" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleCanvas;
