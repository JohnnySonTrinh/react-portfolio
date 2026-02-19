import { useEffect, useRef, useCallback } from 'react';
import "../../styles/particle-effects.css";

// Next step move this logic into a custom hook (e.g. useParticleCanvas)

// ParticleCanvas renders a full‑screen animated particle system
// on a <canvas>. Particles drift slowly, bounce off the
// edges of the viewport, form faint links when near one another,
// and are pushed away from the mouse cursor. The implementation
// avoids any external libraries so future developers can trace
// the rendering and physics logic directly.

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  // Create an array of particle objects sized to match the
  // provided canvas dimensions. The count is proportional to
  // area so the effect scales on large screens without being too
  // heavy on smaller viewports.

  const initParticles = useCallback((width, height) => {
    const particles = [];
    // number of particles = area / divisor; tweak divisor for
    // density. Lower value -> more particles.

    const particleCount = Math.floor((width * height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // horizontal velocity; random small speed left/right
        vx: (Math.random() - 0.5) * 0.5,
        // vertical velocity; random small speed up/down
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,    // Random size 0.5-2.5px
        alpha: Math.random() * 0.5 + 0.2, // Random opacity 0.2-0.7
        color: Math.random() > 0.5 ? '#00ff88' : '#00ffff' // Green or Cyan
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // callback run when window dimensions change.  Resets
    // canvas size and re‑creates particles so they fill the new
    // space evenly rather than stretching the old ones.

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // update mouseRef with the latest pointer coordinates; used
    // later to create a repulsion effect around the cursor.

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // main render loop driven by requestAnimationFrame.  Clears
    // the canvas each frame, moves every particle, applies
    // interactions and finally draws particles and the lines
    // connecting nearby pairs.

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, i) => {
        // simply advance the particle according to its velocity

        particle.x += particle.vx;
        particle.y += particle.vy;

        // if the cursor is within a certain radius, calculate a
        // small force pushing the particle away to simulate
        // a magnetic/repulsion effect.

        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.02;
          particle.vy -= (dy / dist) * force * 0.02;
        }

        // simple collision with canvas boundaries; flip
        // velocity component when particle crosses an edge.

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // clamp position to [0,width]×[0,height] to avoid
        // particles getting stuck outside after a bounce.

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // draw a filled circle at the particle's coordinates


        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();

        // iterate over later particles and draw a faint line
        // between them if they're closer than the threshold.

        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.2;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // remove event listeners and cancel the animation frame
    // when the component unmounts to prevent memory leaks.

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticleCanvas;