"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function LightsToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // reserve the space before hydration so the nav doesn't jump
  if (!mounted) {
    return <span className="font-mono text-sm text-mut">lights: …</span>;
  }

  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="cursor-pointer font-mono text-sm text-mut transition-colors hover:text-accent"
      aria-label={dark ? "Turn on the lights (light mode)" : "Turn off the lights (dark mode)"}
    >
      <span className="hidden lg:inline">{dark ? "turn_on_the_lights()" : "turn_off_the_lights()"}</span>
      <span className="lg:hidden">{dark ? "lights_on()" : "lights_off()"}</span>
    </button>
  );
}
