"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SectionHeading } from "./section-heading";

const clients = [
  {
    id: 1,
    name: "Epping Firearms Fishing & Outdoors",
    designation: "Outdoor retail",
    image: "/assets/clients/epping-firearms.png",
    imageClassName: "h-16",
  },
  {
    id: 2,
    name: "Hawke",
    designation: "Sport optics",
    image: "/assets/clients/hawke.svg",
    imageClassName: "h-8",
  },
  {
    id: 3,
    name: "SPIKA",
    designation: "Hunting apparel & gear",
    image: "/assets/clients/spika.png",
    imageClassName: "h-12",
  },
  {
    id: 4,
    name: "ThermTec",
    designation: "Thermal imaging",
    image: "/assets/clients/thermtec.png",
    imageClassName: "h-8 invert-[.88] grayscale",
  },
  {
    id: 5,
    name: "MasjidBoard Live",
    designation: "Digital signage",
    image: "/assets/clients/masjidboard-live.png",
    imageClassName: "h-16",
  },
  {
    id: 6,
    name: "Stellar-Med",
    designation: "Healthcare",
    image: "/assets/clients/stellar-med.png",
    imageClassName: "h-8",
  },
  {
    id: 7,
    name: "Buy Aprons",
    designation: "E-commerce",
    image: "/assets/clients/buy-aprons.png",
    imageClassName: "h-8",
  },
];

export function Clients() {
  return (
    <section id="clients" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="Who we work with" title="Brands we work with." />
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-7">
        {clients.map((c) => (
          <div
            key={c.id}
            className="flex min-h-[100px] items-center justify-center rounded-xl border border-line bg-white px-4 py-4 transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_14px_30px_rgba(13,31,26,0.1)]"
          >
            <AnimatedTooltip items={[c]} />
          </div>
        ))}
      </div>
    </section>
  );
}
