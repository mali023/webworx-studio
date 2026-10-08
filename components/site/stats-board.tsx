"use client";

import { useEffect, useRef, useState } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";
import { SectionHeading } from "./section-heading";

/* a split-flap departures board, 6 rows × 22 columns —
   {g}/{y} are coloured indicator tiles */
const SCREENS: string[][] = [
  [
    "  WEBWORX DEPARTURES",
    "",
    "{g} PROJECTS 30+ DONE",
    "{g} BRANDS    7  LIVE",
    "{g} COUNTRIES 2  OPEN",
    "{y} YOUR IDEA BOARDING",
  ],
  [
    "  WEBWORX DEPARTURES",
    "",
    "  NOW BOARDING:",
    "  YOUR PROJECT",
    "  GATE W-X",
    "{g} STATUS: ON TIME",
  ],
  [
    "  WEBWORX DEPARTURES",
    "",
    "{g} REPLIES   <24 HRS",
    "{g} TEMPLATES  0 USED",
    "{g} COFFEE    99+ CUPS",
    "{y} YOUR IDEA BOARDING",
  ],
];

export function StatsBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), 6500);
    return () => clearInterval(t);
  }, [started]);

  return (
    <section id="stats" className="scroll-mt-24 border-y border-line bg-tint dark:bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="The numbers" title="Now departing: your project." />
            <p className="-mt-4 max-w-[44ch] leading-relaxed text-mut">
              Thirty-plus projects shipped, seven brands on the books, two countries
              served — and the board updates the old-fashioned way, one flap at a time.
            </p>
          </div>
          <div ref={ref}>
            <TextFlippingBoard
              rows={started ? SCREENS[screen] : SCREENS[0].map(() => "")}
              duration={0.15}
              className="mx-auto w-full max-w-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
