"use client";

import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/spotlight";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Terminal } from "@/components/ui/terminal";

const verbs = ["design", "build", "ship", "repair", "caffeinate"];

const commands = [
  "whoami",
  "ls ./services",
  "./new_project.sh --client you",
];

const outputs: Record<number, string[]> = {
  0: ["webworx-studio — a digital studio in Melbourne, AU"],
  1: [
    "websites/   web-apps/   mobile-apps/",
    "design/     social/     repairs/",
  ],
  2: ["✓ brief received", "✓ coffee brewed", "🚀 let's build"],
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Spotlight className="-top-40 left-0 hidden dark:block md:-top-20 md:left-60" fill="#00a878" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-20 pb-16 md:min-h-[78vh] md:grid-cols-[1.05fr_0.95fr] md:pt-10">
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

        <div aria-hidden className="max-md:order-2">
          <Terminal
            commands={commands}
            outputs={outputs}
            username="webworx"
            enableSound={false}
            typingSpeed={45}
            className="max-w-none px-0"
          />
        </div>
      </div>
    </section>
  );
}
