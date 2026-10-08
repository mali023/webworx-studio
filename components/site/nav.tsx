"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { LogoLockup } from "./logo";
import { LightsToggle } from "./lights-toggle";

const items = [
  { name: "Services", link: "#services" },
  { name: "Repairs", link: "#workshop" },
  { name: "Work", link: "#work" },
  { name: "Apps", link: "#apps" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <Navbar className="top-0 pt-3">
      {/* desktop */}
      <NavBody className="border border-transparent data-[visible=true]:border-line">
        <div className="relative z-20">
          <LogoLockup />
        </div>
        <NavItems items={items} className="text-mut" />
        <div className="relative z-20 flex items-center gap-4">
          <LightsToggle />
          <a
            href="#contact"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-[#04110c] transition hover:-translate-y-0.5 hover:bg-[#00b487]"
          >
            Contact
          </a>
        </div>
      </NavBody>

      {/* mobile */}
      <MobileNav>
        <MobileNavHeader className="px-3">
          <LogoLockup />
          <div className="flex items-center gap-3">
            <LightsToggle />
            <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          {items.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={() => setOpen(false)}
              className="w-full text-base font-medium text-fg"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="w-full rounded-lg bg-brand px-4 py-2.5 text-center text-sm font-semibold text-[#04110c]"
          >
            Contact
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
