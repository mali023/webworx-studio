import { LogoLockup } from "./logo";
import { LightsToggle } from "./lights-toggle";

const links = [
  { href: "#services", label: "services" },
  { href: "#workshop", label: "repairs" },
  { href: "#work", label: "work" },
  { href: "#apps", label: "apps" },
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
              className="hidden font-mono text-sm text-mut transition-colors hover:text-accent md:inline"
            >
              {l.label}
            </a>
          ))}
          <LightsToggle />
          <a
            href="#contact"
            className="hidden font-mono text-sm text-accent underline-offset-4 hover:underline sm:inline"
          >
            contact --now
          </a>
        </nav>
      </div>
    </header>
  );
}
