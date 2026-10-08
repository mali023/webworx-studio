"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconBulb, IconBulbOff } from "@tabler/icons-react";

export function LightsToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // reserve the space before hydration so the nav doesn't jump
  if (!mounted) {
    return <span className="inline-block h-9 w-9" aria-hidden />;
  }

  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-line text-mut transition-colors hover:border-brand/50 hover:text-accent"
      aria-label={dark ? "Turn on the lights (light mode)" : "Turn off the lights (dark mode)"}
      title={dark ? "lights_on()" : "lights_off()"}
    >
      {dark ? <IconBulb className="h-5 w-5" /> : <IconBulbOff className="h-5 w-5" />}
    </button>
  );
}
