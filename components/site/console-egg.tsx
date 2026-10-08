"use client";

import { useEffect } from "react";

export function ConsoleEgg() {
  useEffect(() => {
    // one small wink for the devs who look under the hood
    console.log(
      "%c<WX/> %cYou opened the console. We like you already. → webworxstudio.au/#contact",
      "color:#00a878;font-weight:bold;font-size:14px;",
      "color:inherit;",
    );
  }, []);
  return null;
}
