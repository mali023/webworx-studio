import { cn } from "@/lib/utils";

export function WxMark({ small = false }: { small?: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-block whitespace-nowrap border-fg font-mono font-bold leading-none text-fg",
        small ? "border-[2.5px] px-2.5 py-1.5 text-sm" : "border-[3px] px-3 py-2 text-base",
      )}
    >
      <span className="text-accent2">&lt;</span>
      <span>WX</span>
      <span className="text-accent">/&gt;</span>
      <i
        aria-hidden
        className={cn(
          "absolute bg-brand",
          small ? "-top-1.5 -right-1.5 h-2.5 w-2.5" : "-top-2 -right-2 h-3 w-3",
        )}
      />
    </span>
  );
}

export function LogoLockup() {
  return (
    <a href="#top" aria-label="Webworx Studio — home" className="flex items-center gap-3.5">
      <WxMark />
      <span className="font-head text-[0.95rem] font-extrabold tracking-[0.14em] text-fg">
        WEBWORX
        <em className="block text-[0.62rem] not-italic tracking-[0.42em] text-accent">
          STUDIO
        </em>
      </span>
    </a>
  );
}
