import { WxMark } from "./logo";
import { Year } from "./year";

const links = [
  { href: "#services", label: "Services" },
  { href: "#workshop", label: "Repairs" },
  { href: "#work", label: "Work" },
  { href: "#apps", label: "Apps" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <WxMark small />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium text-mut transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-mut">
          © <Year /> Webworx Studio — websites · web apps · mobile apps · design · social ·
          repairs
        </p>
        <p className="font-mono text-xs text-mut">
          {"// no templates were harmed in the making of this site"}
        </p>
      </div>
    </footer>
  );
}
