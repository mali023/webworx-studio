"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import createGlobe from "cobe";

// Melbourne & Johannesburg — the two homes of the studio
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [-37.8136, 144.9631], size: 0.1 },
  { location: [-26.2041, 28.0473], size: 0.08 },
];

function GlobeCanvas({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    // defer creation one tick: React StrictMode mounts effects twice, and a
    // second createGlobe on the same canvas corrupts cobe's WebGL buffers —
    // the throwaway first effect is cancelled before it ever creates
    let globe: ReturnType<typeof createGlobe> | null = null;
    let cancelled = false;

    const timer = setTimeout(() => {
      if (cancelled) return;
      let phi = 4.2; // start roughly over the Indian Ocean, between AU and ZA
      const width = canvas.offsetWidth || 460;
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi,
        theta: 0.35,
        dark: dark ? 1 : 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: dark ? [0.35, 0.65, 0.55] : [0.38, 0.54, 0.48],
        markerColor: [0.1, 1, 0.75],
        glowColor: dark ? [0.25, 0.45, 0.37] : [0.85, 0.92, 0.89],
        markers: MARKERS,
        onRender: (state) => {
          state.phi = phi;
          phi += 0.0035;
        },
      });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      globe?.destroy();
    };
  }, [dark, inView]);

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full"
      aria-label="Globe showing Melbourne and Johannesburg"
    />
  );
}

export function Globe({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={className} aria-hidden />;

  // key by theme: each theme gets a FRESH canvas element, because cobe
  // corrupts its WebGL state when re-created on the same canvas
  return (
    <div className={className}>
      <GlobeCanvas key={resolvedTheme} dark={resolvedTheme === "dark"} />
    </div>
  );
}
