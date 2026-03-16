import { useCallback, useEffect, useRef } from "react";
import { useSiteSettings } from "./useSiteSettings";

const PARTICLE_AREA_DIVISOR = 15000;
const PARTICLE_LINK_DISTANCE = 100;
const PARTICLE_REPULSION_DISTANCE = 150;
const PARTICLE_REPULSION_FORCE = 0.02;

const createParticles = (width, height) => {
  const particles = [];
  const particleCount = Math.floor((width * height) / PARTICLE_AREA_DIVISOR);

  for (let i = 0; i < particleCount; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? "#00ff88" : "#00ffff",
    });
  }

  return particles;
};

const clampParticlePosition = (particle, width, height) => {
  particle.x = Math.max(0, Math.min(width, particle.x));
  particle.y = Math.max(0, Math.min(height, particle.y));
};

const applyMouseRepulsion = (particle, mousePosition) => {
  const dx = mousePosition.x - particle.x;
  const dy = mousePosition.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < PARTICLE_REPULSION_DISTANCE && distance > 0) {
    const force =
      (PARTICLE_REPULSION_DISTANCE - distance) / PARTICLE_REPULSION_DISTANCE;

    particle.vx -= (dx / distance) * force * PARTICLE_REPULSION_FORCE;
    particle.vy -= (dy / distance) * force * PARTICLE_REPULSION_FORCE;
  }
};

const drawParticle = (ctx, particle) => {
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fillStyle = particle.color;
  ctx.globalAlpha = particle.alpha;
  ctx.fill();
};

const drawParticleLinks = (ctx, particle, otherParticles) => {
  otherParticles.forEach((other) => {
    const dx = particle.x - other.x;
    const dy = particle.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < PARTICLE_LINK_DISTANCE) {
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(other.x, other.y);
      ctx.strokeStyle = particle.color;
      ctx.globalAlpha = (1 - distance / PARTICLE_LINK_DISTANCE) * 0.2;
      ctx.stroke();
    }
  });
};

const useParticleCanvas = () => {
  const { settings } = useSiteSettings();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const showParticles = settings.showParticles;

  const resizeCanvas = useCallback((canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesRef.current = createParticles(canvas.width, canvas.height);
  }, []);

  const animateParticles = useCallback((ctx, canvas) => {
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        applyMouseRepulsion(particle, mouseRef.current);

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        clampParticlePosition(particle, canvas.width, canvas.height);
        drawParticle(ctx, particle);
        drawParticleLinks(ctx, particle, particlesRef.current.slice(index + 1));
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    if (!showParticles) {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    const handleResize = () => {
      resizeCanvas(canvas);
    };

    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    resizeCanvas(canvas);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animateParticles(ctx, canvas);

    // Remove listeners and animation work when particles are hidden or the component unmounts.
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateParticles, resizeCanvas, showParticles]);

  return {
    canvasRef,
    showParticles,
  };
};

export default useParticleCanvas;
