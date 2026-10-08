import { LogoLockup } from "./logo";
import { LightsToggle } from "./lights-toggle";

const links = [
  { href: "#services", label: "Services" },
  { href: "#workshop", label: "Repairs" },
  { href: "#work", label: "Work" },
  { href: "#apps", label: "Apps" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <LogoLockup />
        <nav aria-label="Site" className="flex items-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-sm font-medium text-mut transition-colors hover:text-accent md:inline"
            >
              {l.label}
            </a>
          ))}
          <LightsToggle />
          <a
            href="#contact"
            className="hidden rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-[#04110c] transition hover:bg-[#00b487] sm:inline"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
