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

function LogoChip({ client }: { client: (typeof clients)[number] }) {
  return (
    <li className="flex h-[100px] w-[180px] shrink-0 items-center justify-center rounded-xl border border-line bg-white px-5 transition-colors hover:border-brand/50">
      <AnimatedTooltip items={[client]} />
    </li>
  );
}

export function Clients() {
  return (
    <section id="clients" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="Who we work with" title="Brands we work with." />
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max items-center gap-4 py-2 [animation:wx-marquee_36s_linear_infinite] hover:[animation-play-state:paused]">
          {clients.map((c) => (
            <LogoChip key={c.id} client={c} />
          ))}
          {clients.map((c) => (
            <LogoChip key={`dup-${c.id}`} client={{ ...c, id: c.id + 100 }} />
          ))}
        </ul>
      </div>
    </section>
  );
}
