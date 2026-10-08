"use client";

import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundLines } from "@/components/ui/background-lines";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WxTerminal } from "./wx-terminal";

const verbs = ["design", "build", "ship", "repair", "caffeinate"];

export function Hero() {
  return (
    <BackgroundLines
      className="relative h-auto w-full overflow-hidden bg-transparent dark:bg-transparent"
      svgOptions={{ duration: 7 }}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-16 pb-10 md:grid-cols-[1.05fr_0.95fr] md:pt-12">
        <div>
          <p className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-sm font-medium text-mut">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            Open for new projects
          </p>
          <h1 className="mb-6 font-head text-4xl font-extrabold leading-[1.08] tracking-tight text-fg md:text-6xl">
            We
            <FlipWords words={verbs} className="text-accent dark:text-accent" />
            <br />
            things that work.
          </h1>
          <p className="mb-8 max-w-[54ch] leading-relaxed text-mut">
            <strong className="font-semibold text-fg">Webworx Studio</strong> is a
            Melbourne-based digital studio. We build websites, custom web apps and
            mobile apps, back them with graphic design and social media management —
            and run a specialist repair bench for thermal optics. From first idea
            to launch, we do the lot.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton strength={0.4} maxDistance={40}>
              <a
                href="#contact"
                className="inline-block rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-[#04110c] shadow-[0_8px_24px_rgba(0,168,120,0.3)] transition-shadow hover:shadow-[0_12px_30px_rgba(0,168,120,0.45)]"
              >
                Start a project →
              </a>
            </MagneticButton>
            <a
              href="#work"
              className="rounded-xl border border-liner bg-surface/60 px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-brand hover:text-accent"
            >
              See our work
            </a>
          </div>
        </div>

        <div className="max-md:order-2">
          <WxTerminal />
        </div>
      </div>
    </BackgroundLines>
  );
}
