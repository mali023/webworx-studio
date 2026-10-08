"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SectionHeading } from "./section-heading";

type Project = {
  path: string;
  title: string;
  description: string;
  chips: string[];
};

const projects: Project[] = [
  {
    path: "~/work/epping-ffo",
    title: "Epping Firearms Fishing & Outdoors",
    description:
      "Online storefront plus custom back-office management tools, integrated with the shop's Retail Express point of sale.",
    chips: ["e-commerce", "web app", "POS integration"],
  },
  {
    path: "~/work/hawke",
    title: "Hawke",
    description:
      "Automated inventory and sales reporting tooling for the optics brand — plus full social media management, month in, month out.",
    chips: ["reporting", "automation", "social media"],
  },
  {
    path: "~/work/masjidboard-live",
    title: "MasjidBoard Live",
    description:
      "Live digital prayer-time boards with remote admin and a mobile search — our own product, running on screens in mosques today.",
    chips: ["product", "digital signage", "web app"],
  },
  {
    path: "~/work/stellarmed",
    title: "Stellarmed Medical Suites",
    description:
      "Clinic website plus the hardware extras — a live doctors' name board and Raspberry Pi lighting control panels for the theatre and spa.",
    chips: ["website", "hardware", "raspberry pi"],
  },
  {
    path: "~/work/posibolt",
    title: "Posibolt ERP",
    description: "Front-end work on Groworx's retail ERP platform, serving over 400 clients.",
    chips: ["ERP", "front-end", "retail"],
  },
  {
    path: "~/work/buy-aprons",
    title: "Buy Aprons",
    description:
      "A high-volume WooCommerce store shipping workwear across South Africa, built to handle the order rush.",
    chips: ["e-commerce", "WooCommerce"],
  },
  {
    path: "~/work/freeway-toyota",
    title: "Freeway Toyota",
    description:
      "An online service booking system for a busy Johannesburg dealership — customers pick a slot, the workshop gets its day planned.",
    chips: ["booking system", "web app"],
  },
  {
    path: "~/work/far-and-wide",
    title: "Far & Wide Travels",
    description: "A travel site where clients browse packages and book their next trip online.",
    chips: ["website", "booking"],
  },
  {
    path: "~/work/lpr-integration",
    title: "Luxriot × Milesight LPR",
    description:
      "Licence-plate recognition cameras integrated into a Luxriot video management system — number plates in, searchable events out.",
    chips: ["CCTV", "integration"],
  },
  {
    path: "~/work/the-natural-spot",
    title: "The Natural Spot",
    description: "An online store for a Johannesburg natural-products retailer, from catalogue to checkout.",
    chips: ["e-commerce", "website"],
  },
  {
    path: "~/work/bake-it-yourself",
    title: "Bake It Yourself",
    description: "An online store for a home-based baking business — WooCommerce, recommended and delivered.",
    chips: ["e-commerce", "WooCommerce"],
  },
  {
    path: "~/work/nappyplum",
    title: "Nappyplum",
    description: "Our own venture: convenient essentials for parents, delivered across South Africa.",
    chips: ["venture", "e-commerce"],
  },
];

export function Work() {
  return (
    <section id="work" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionHeading eyebrow="recent_work" title="Work that's out there." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <CardContainer
            key={p.path}
            containerClassName="py-0 h-full"
            className="h-full w-full"
          >
            <CardBody className="flex h-full w-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors group-hover/card:border-brand/50 hover:border-brand/50">
              <CardItem as="p" translateZ={30} className="mb-3 font-mono text-xs text-accent">
                {p.path}
              </CardItem>
              <CardItem
                as="h3"
                translateZ={50}
                className="mb-2 font-head text-lg font-bold tracking-tight text-fg"
              >
                {p.title}
              </CardItem>
              <CardItem as="p" translateZ={40} className="grow text-sm leading-relaxed text-mut">
                {p.description}
              </CardItem>
              <CardItem as="ul" translateZ={25} className="mt-4 flex w-full flex-wrap gap-1.5">
                {p.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-liner px-2.5 py-0.5 font-mono text-[0.7rem] text-mut"
                  >
                    {c}
                  </li>
                ))}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  );
}
