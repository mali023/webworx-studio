"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SectionHeading } from "./section-heading";

export function Apps() {
  return (
    <section id="apps" className="w-full scroll-mt-24 overflow-hidden px-6">
      <ContainerScroll
        titleComponent={
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <SectionHeading eyebrow="Our apps" title="Software we make ourselves." />
            <div className="-mt-4 mb-2 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/apps/spacenames.jpg"
                alt="SpaceNames app icon"
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-[22.5%] shadow-[0_8px_20px_rgba(43,26,110,0.35)]"
              />
              <div className="text-left">
                <p className="font-head text-xl font-bold text-fg">
                  SpaceNames{" "}
                  <span className="ml-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 align-middle text-xs font-semibold text-accent">
                    for macOS
                  </span>
                </p>
                <p className="text-sm text-mut">Names, colours and icons for your Mac&apos;s desktops.</p>
              </div>
            </div>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-5">
              <a
                href="https://spacenames.webworxstudio.au"
                className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-[#04110c] shadow-[0_8px_24px_rgba(0,168,120,0.3)] transition hover:bg-[#00b487]"
              >
                Visit SpaceNames →
              </a>
              <a
                href="https://spacenames.webworxstudio.au/#download"
                className="text-sm font-medium text-accent hover:underline"
              >
                Download free trial
              </a>
            </div>
            <p className="mb-4 text-xs text-mut">14-day free trial · A$14.99 once · macOS 27 · Apple Silicon</p>
          </div>
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/apps/spacenames-site.png"
          alt="SpaceNames on a Mac — named desktops in Mission Control: Personal, Work, Design, Clients and Music"
          className="h-full w-full rounded-2xl object-cover object-top"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
}
