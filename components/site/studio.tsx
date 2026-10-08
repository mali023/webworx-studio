"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "./section-heading";

const Globe = dynamic(() => import("./globe").then((m) => m.Globe), {
  ssr: false,
  loading: () => <div className="aspect-square w-full" aria-hidden />,
});

const facts = [
  ["base:", "Melbourne, AU"],
  ["serving:", "AU · ZA · anywhere with wifi"],
  ["stack:", "js/ts · react · node · php · swift"],
  ["response_time:", "usually <24h"],
];

export function Studio() {
  return (
    <section id="studio" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="the_studio" title="Small studio. Senior work." />
      <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="max-w-[58ch] leading-relaxed text-mut">
            Webworx Studio is run by <strong className="font-semibold text-fg">Mali</strong> — a
            full-stack developer who has shipped websites, apps, e-commerce stores and the odd
            hardware project from Johannesburg to Melbourne. You talk directly to the person
            building your thing: no account managers, no hand-offs, no templates.
          </p>
          <div className="mt-7 grid gap-2.5 rounded-2xl border border-line bg-surface p-6 font-mono text-sm text-mut">
            {facts.map(([k, v]) => (
              <p key={k}>
                <span className="text-accent">$</span> {k}{" "}
                <span className="text-fg">{v}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[460px]">
          <Globe />
          <p className="mt-2 text-center font-mono text-xs text-mut">
            // two dots, one studio — melbourne &amp; joburg
          </p>
        </div>
      </div>
    </section>
  );
}
