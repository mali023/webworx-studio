"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./section-heading";

const steps = ["intake", "diagnose", "repair", "test", "return ✓"];

const points = [
  "Brand-standard test procedures on every unit",
  "Consignment parts direct from the brand",
  "A documented job card from intake to return",
  "Dealer and direct intake welcome",
];

export function Workshop() {
  return (
    <section id="workshop" className="scroll-mt-24 border-y border-line bg-tint dark:bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="The workshop" title="The repair bench." />
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="max-w-[58ch] leading-relaxed text-mut">
              Webworx isn&apos;t only pixels. We run a specialist workshop servicing{" "}
              <strong className="font-semibold text-fg">thermal optics</strong> on behalf
              of a well-renowned brand — whether your unit comes in through a dealer or
              straight from you.
            </p>
            <ul className="mt-7 grid gap-3">
              {points.map((p) => (
                <li key={p} className="relative pl-7 text-mut">
                  <span className="absolute left-0 top-0 font-mono font-bold text-accent">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div
            aria-label="Repair process"
            className="flex flex-wrap items-center justify-center gap-2.5 rounded-2xl border border-liner bg-surface p-8 shadow-[0_18px_40px_rgba(13,31,26,0.08)] dark:bg-bg"
          >
            {steps.map((step, i) => (
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.18, duration: 0.4 }}
                className="flex items-center gap-2.5 text-sm font-medium"
              >
                <span
                  className={
                    step.includes("✓")
                      ? "whitespace-nowrap rounded-lg bg-brand px-4 py-2.5 font-bold text-[#04110c]"
                      : "whitespace-nowrap rounded-lg border border-liner bg-bg px-4 py-2.5 text-fg dark:bg-surface"
                  }
                >
                  {step}
                </span>
                {i < steps.length - 1 && <span className="text-mut">→</span>}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
