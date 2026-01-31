import React, { useEffect, useMemo, useRef, useState } from "react";

type View = "home" | "shop";

type Product = {
  id: string;
  name: string;
  price: string;
  desc: string;
  tag?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Fondo de estrellas:
 * - Canvas a pantalla completa
 * - Estrellas pequeñas con drift (movimiento suave)
 * - Twinkle (tintineo)
 * - Mask radial para que el centro quede más limpio (no tapa lo de en medio)
 */
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

function LogoBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-2xl border border-white/15 bg-white/5 grid place-items-center">
        <span className="text-xl">⬡</span>
      </div>
      <div className="leading-tight">
        <p className="text-lg font-semibold tracking-tight text-white">{label}</p>
        <p className="text-xs text-white/60">Experiencia premium</p>
      </div>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_30px_80px_-50px_rgba(0,0,0,0.9)]",
        "transition-transform duration-300 hover:-translate-y-1"
      )}
    >
      {/* glow hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-white/15 via-white/5 to-white/10 blur-[12px]" />
      </div>

      <div className="relative">
        {p.tag ? (
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
            {p.tag}
          </span>
        ) : null}

        <h3 className="mt-3 text-xl font-semibold text-white">{p.name}</h3>
        <p className="mt-2 text-sm text-white/65 leading-relaxed">{p.desc}</p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-semibold text-white">{p.price}</p>

          <button
            type="button"
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-semibold",
              "bg-white text-black hover:bg-white/90",
              "active:scale-[0.98] transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            )}
            onClick={() => alert(`Comprar: ${p.name}`)}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Landing2Views() {
  const [view, setView] = useState<View>("home");
  const [transitioning, setTransitioning] = useState(false);

  const products: Product[] = useMemo(
    () => [
      { id: "p1", name: "Entrada General", price: "S/ 30", desc: "Acceso estándar al evento. QR válido para 1 ingreso.", tag: "Más vendido" },
      { id: "p2", name: "VIP", price: "S/ 60", desc: "Ingreso preferente + zona VIP. QR válido para 1 ingreso.", tag: "Recomendado" },
      { id: "p3", name: "Full Experience", price: "S/ 90", desc: "VIP + beneficios extra. Ideal si quieres la mejor experiencia.", tag: "Nuevo" },
    ],
    []
  );

  const goShop = () => {
    if (transitioning) {
        console.log("TRANSITIONING")
        return;
    } 
    console.log("CLICK");
    setTransitioning(true);
    // transición “misma página”: dejamos animar salida y luego cambiamos view
    window.setTimeout(() => {
      setView("shop");
      window.setTimeout(() => setTransitioning(false), 350);
    }, 380);
  };

  const goHome = () => {
    if (transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setView("home");
      window.setTimeout(() => setTransitioning(false), 350);
    }, 380);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo monocromático: negro con aclarado suave */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#07070a] to-[#0b0b12]" />

      {/* Starfield detrás */}
      <Starfield density={12000} centerClearRadius={0.42} />

      {/* Viñeta para enfoque al centro (y que estrellas no “tapen”) */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,transparent_0%,black_60%)] bg-black/30" />

      {/* Contenedor */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-14">
        {/* Barra mínima */}
        <div className="flex items-center justify-between">
          <LogoBlock label="TuMarca" />

          <div className="flex items-center gap-2">
            {view === "shop" ? (
              <button
                type="button"
                onClick={goHome}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
              >
                Volver
              </button>
            ) : (
              <span className="text-xs text-white/50 hidden sm:block">
                Landing con estrellas + transición suave
              </span>
            )}
          </div>
        </div>

        {/* “Pages” (mismo layout, cambia contenido con animación) */}
        <div className="relative mt-12 md:mt-16">
          {/* HOME */}
          <section
            className={cn(
              "absolute inset-0 transition-all duration-500",
              view === "home" ? "pointer-events-auto" : "pointer-events-none",
              view === "home" && !transitioning ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
            aria-hidden={view !== "home"}
          >
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-10">
              {/* Bloque superior (logo+texto desde arriba) */}
              <div
                className={cn(
                  "transition-all duration-700",
                  "animate-[enterDown_700ms_cubic-bezier(.2,.8,.2,1)_both]", "border-4 border-green-500"
                )}
              >
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
                  Una experiencia{" "}
                  <span className="text-white/70">minimal</span> y{" "}
                  <span className="text-white">premium</span>.
                </h1>
                <p className="mt-5 max-w-2xl text-base md:text-lg text-white/65 leading-relaxed">
                  Fondo negro elegante, estrellas sutiles y una transición que se siente fluida.
                  Perfecto para un producto, evento o landing de marca.
                </p>
              </div>

              {/* Botón inferior desde abajo */}
              <div
                className={cn(
                  "transition-all duration-700",
                  "animate-[enterUp_700ms_cubic-bezier(.2,.8,.2,1)_both]"
                )}
              >
                <button
                  type="button"
                  onClick={goShop}
                  className={cn(
                    "rounded-2xl px-6 py-3 md:px-8 md:py-4",
                    "bg-white text-black font-semibold",
                    "hover:bg-white/90 active:scale-[0.98] transition",
                    "shadow-[0_30px_80px_-60px_rgba(255,255,255,0.6)]"
                  )}
                >
                  Empezar
                </button>
                <p className="mt-3 text-xs text-white/45">Click para ver los cards de compra</p>
              </div>
            </div>
          </section>

          {/* SHOP */}
          <section
            className={cn(
                "absolute inset-0 transition-all duration-500",
                view === "shop"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            )}
            aria-hidden={view !== "shop"}
          >
            {/* espacio para que no se encime con el absolute del home */}
            <div className={cn(view === "shop" ? "block" : "invisible")}>

              <div className="min-h-[70vh]">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold tracking-widest uppercase text-white/55">
                    compra
                  </p>
                  <h2 className="mt-3 text-3xl md:text-5xl font-semibold text-white">
                    Elige tu opción
                  </h2>
                  <p className="mt-4 text-white/65 leading-relaxed">
                    Cards modernas, hover sutil, botón claro de acción. Esto luego lo conectas
                    a tu pasarela / backend.
                  </p>
                </div>

                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((p, idx) => (
                    <div
                      key={p.id}
                      className={cn(
                        "transition-all duration-700",
                        "opacity-0 translate-y-4",
                        "animate-[fadeUp_700ms_cubic-bezier(.2,.8,.2,1)_both]"
                      )}
                      style={{ animationDelay: `${120 + idx * 90}ms` }}
                    >
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6">
                  <p className="text-sm text-white/70">
                    Tip: si quieres que la transición se sienta aún más “misma página”, podemos agregar
                    un <span className="text-white font-semibold">zoom</span> del fondo o un
                    <span className="text-white font-semibold"> swipe</span> lateral.
                  </p>
                </div>

                <div className="mt-10 flex gap-3">
                  <button
                    type="button"
                    onClick={goHome}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 transition"
                  >
                    Volver al inicio
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 active:scale-[0.98] transition"
                    onClick={() => alert("Siguiente paso: checkout")}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Spacer para que el absolute HOME no colapse el layout */}
          <div className="h-[70vh]" />
        </div>
      </div>

      {/* Animaciones (sin tocar tailwind.config) */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-8px) }
        }
        @keyframes enterDown {
          from { opacity: 0; transform: translateY(-22px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes enterUp {
          from { opacity: 0; transform: translateY(22px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px) }
          to   { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  );
}