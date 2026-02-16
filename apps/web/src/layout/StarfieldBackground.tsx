import { useEffect, useMemo, useRef } from "react";

function Starfield({
      density = 110, // ajusta según gusto (80-160)
      centerClearRadius = 0.38, // 0..1 (más alto = centro más despejado)
    }: {
      density?: number;
      centerClearRadius?: number;
    }) {
      const canvasRef = useRef<HTMLCanvasElement | null>(null);
      const rafRef = useRef<number | null>(null);
    
      const prefersReducedMotion = useMemo(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
      }, []);
    
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
    
        const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    
        const resize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          canvas.width = Math.floor(w * dpr);
          canvas.height = Math.floor(h * dpr);
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
    
        resize();
        window.addEventListener("resize", resize);
    
        // Stars
        const w = () => window.innerWidth;
        const h = () => window.innerHeight;
    
        const count = Math.max(40, Math.floor((w() * h()) / 12000)); // escala por pantalla
        const finalCount = Math.floor((count + density) / 2);
    
        const stars = Array.from({ length: finalCount }).map((_, i) => {
          const baseR = Math.random() * 1.15 + 0.25; // tamaño chiquito
          const speed = Math.random() * 0.15 + 0.05;
          const angle = Math.random() * Math.PI * 2;
    
          return {
            id: i,
            x: Math.random() * w(),
            y: Math.random() * h(),
            r: baseR,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            phase: Math.random() * Math.PI * 2,
            tw: Math.random() * 0.6 + 0.2, // twinkle amplitude
            a: Math.random() * 0.35 + 0.25, // opacity base (bajo)
          };
        });
    
        let t0 = performance.now();
    
        const draw = (t: number) => {
          const dt = Math.min(50, t - t0);
          t0 = t;
    
          ctx.clearRect(0, 0, w(), h());
    
          const cx = w() / 2;
          const cy = h() / 2;
          const maxR = Math.min(w(), h()) * centerClearRadius;
    
          for (const s of stars) {
            if (!prefersReducedMotion) {
              // movimiento suave
              s.x += (s.vx * dt) / 16;
              s.y += (s.vy * dt) / 16;
    
              // wrap
              if (s.x < -10) s.x = w() + 10;
              if (s.x > w() + 10) s.x = -10;
              if (s.y < -10) s.y = h() + 10;
              if (s.y > h() + 10) s.y = -10;
            }
    
            // máscara radial: menos intensidad cerca del centro
            const dx = s.x - cx;
            const dy = s.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const centerMask = dist < maxR ? dist / maxR : 1; // 0..1 en centro
            const mask = 0.15 + 0.85 * centerMask; // nunca 0 total
    
            const twinkle = prefersReducedMotion ? 1 : 1 + Math.sin((t / 700) + s.phase) * s.tw;
            const alpha = Math.max(0, Math.min(1, s.a * twinkle * mask));
    
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fill();
          }
    
          rafRef.current = requestAnimationFrame(draw);
        };
    
        rafRef.current = requestAnimationFrame(draw);
    
        return () => {
          window.removeEventListener("resize", resize);
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
      }, [density, centerClearRadius, prefersReducedMotion]);
    
      return (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
        />
      );
    }

const StarfieldBackground = () => { 
    
    return (<Starfield density={12000} centerClearRadius={0.42} />);
}

export default StarfieldBackground;