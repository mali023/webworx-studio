"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SectionHeading } from "./section-heading";

export function Apps() {
  return (
    <section id="apps" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="our_apps" title="Software we make ourselves." />
      <CardContainer containerClassName="py-0" className="w-full">
        <CardBody className="flex h-auto w-full flex-col items-start gap-7 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center">
          <CardItem translateZ={60}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/apps/spacenames.jpg"
              alt="SpaceNames app icon"
              width={96}
              height={96}
              loading="lazy"
              className="h-24 w-24 rounded-[22.5%] shadow-[0_12px_30px_rgba(43,26,110,0.35)]"
            />
          </CardItem>
          <div className="flex-1">
            <CardItem
              as="h3"
              translateZ={40}
              className="flex flex-wrap items-center gap-2.5 font-head text-xl font-bold text-fg"
            >
              SpaceNames
              <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                for macOS
              </span>
            </CardItem>
            <CardItem as="p" translateZ={30} className="mt-2 max-w-2xl text-sm leading-relaxed text-mut">
              Give every Mac desktop a name, colour and icon in the menu bar, when you
              switch, and right inside Mission Control. A small menu bar app for people
              who live in Spaces.
            </CardItem>
            <CardItem as="p" translateZ={25} className="mt-3 font-mono text-xs text-mut">
              14-day free trial · A$14.99 once · macOS 27 · Apple Silicon
            </CardItem>
            <CardItem translateZ={45} className="mt-5 flex flex-wrap items-center gap-5">
              <a
                href="https://spacenames.webworxstudio.au"
                className="rounded-xl bg-brand px-5 py-3 font-mono text-sm font-semibold text-[#04110c] shadow-[0_8px_24px_rgba(0,168,120,0.3)]"
              >
                visit spacenames →
              </a>
              <a
                href="https://spacenames.webworxstudio.au/#download"
                className="font-mono text-sm text-accent hover:underline"
              >
                download free trial
              </a>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </section>
  );
}
