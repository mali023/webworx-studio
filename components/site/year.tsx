"use client";

import { useEffect, useState } from "react";

// the Date read lives in useEffect so the Next 16 prerender never sees an
// unstable value; 2026 is the launch-year fallback for the static shell
export function Year() {
  const [year, setYear] = useState(2026);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
