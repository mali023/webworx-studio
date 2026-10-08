"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* ============================================================
   The studio terminal: plays a short intro script, then goes
   LIVE — visitors can type commands, and `play` starts Snake.
   ============================================================ */

type Line = { kind: "cmd" | "out" | "ok" | "hint" | "err"; text: string };

const DEMO: { cmd: string; out: Line[] }[] = [
  { cmd: "whoami", out: [{ kind: "out", text: "webworx-studio — a digital studio in Melbourne, AU" }] },
  {
    cmd: "ls ./services",
    out: [
      { kind: "out", text: "websites/   web-apps/   mobile-apps/" },
      { kind: "out", text: "design/     social/     repairs/" },
    ],
  },
  {
    cmd: "./new_project.sh --client you",
    out: [
      { kind: "ok", text: "✓ brief received" },
      { kind: "ok", text: "✓ coffee brewed" },
      { kind: "out", text: "🚀 let's build" },
    ],
  },
];

const HINT: Line = { kind: "hint", text: "this terminal is live — type help, or play 🎮" };

/* ---------- snake ---------- */

const COLS = 34;
const ROWS = 16;
const TICK_MS = 120;

type Cell = [number, number];

type Game = {
  snake: Cell[];
  dir: Cell;
  nextDir: Cell;
  food: Cell;
  score: number;
};

function spawnFood(snake: Cell[]): Cell {
  while (true) {
    const c: Cell = [1 + Math.floor(Math.random() * (COLS - 2)), 1 + Math.floor(Math.random() * (ROWS - 2))];
    if (!snake.some(([x, y]) => x === c[0] && y === c[1])) return c;
  }
}

function newGame(): Game {
  const snake: Cell[] = [
    [9, 8],
    [8, 8],
    [7, 8],
  ];
  return { snake, dir: [1, 0], nextDir: [1, 0], food: spawnFood(snake), score: 0 };
}

function readBest(): number {
  try {
    return Number(localStorage.getItem("wx-snake-best")) || 0;
  } catch {
    return 0;
  }
}

function writeBest(score: number) {
  try {
    localStorage.setItem("wx-snake-best", String(score));
  } catch {
    /* private mode etc. */
  }
}

/* ---------- command styling ---------- */

function CmdText({ text }: { text: string }) {
  const words = text.split(/(\s+)/);
  let first = true;
  return (
    <>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        let cls = "text-neutral-300";
        if (w.startsWith("-")) cls = "text-sky-400";
        else if (w.includes("/") || w.startsWith(".")) cls = "text-cyan-300";
        else if (first) cls = "text-emerald-400";
        first = false;
        return (
          <span key={i} className={cls}>
            {w}
          </span>
        );
      })}
    </>
  );
}

const LINE_CLS: Record<Line["kind"], string> = {
  cmd: "",
  out: "text-neutral-400",
  ok: "text-emerald-400",
  hint: "text-amber-300/90",
  err: "text-red-400",
};

function Prompt() {
  return (
    <span className="text-neutral-500">
      <span className="text-sky-500">webworx</span>
      <span className="text-emerald-600">:</span>
      <span className="text-sky-400">~</span>$&nbsp;
    </span>
  );
}

/* ---------- component ---------- */

export function WxTerminal({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<Line[]>([]);
  const [phase, setPhase] = useState<"idle" | "demo" | "shell" | "game">("idle");
  const [typed, setTyped] = useState(""); // demo typing in progress
  const [buffer, setBuffer] = useState(""); // live user input
  const [focused, setFocused] = useState(false);
  const [, setTick] = useState(0); // game re-render
  // created on `play`, never during render — Math.random() upsets the prerender
  const gameRef = useRef<Game | null>(null);
  const touchRef = useRef<Cell | null>(null);

  const print = useCallback((...added: Line[]) => {
    setLines((prev) => [...prev, ...added].slice(-150));
  }, []);

  /* start the demo when scrolled into view */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase((p) => (p === "idle" ? "demo" : p));
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* scripted intro */
  useEffect(() => {
    if (phase !== "demo") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLines([
        ...DEMO.flatMap((d) => [{ kind: "cmd", text: d.cmd } as Line, ...d.out]),
        HINT,
      ]);
      setPhase("shell");
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const t = setTimeout(res, ms);
        timers.push(t);
      });

    (async () => {
      await wait(500);
      for (const step of DEMO) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return;
          setTyped(step.cmd.slice(0, i));
          await wait(38 + Math.random() * 28);
        }
        await wait(140);
        if (cancelled) return;
        setTyped("");
        print({ kind: "cmd", text: step.cmd });
        for (const o of step.out) {
          await wait(140);
          if (cancelled) return;
          print(o);
        }
        await wait(500);
      }
      if (cancelled) return;
      await wait(250);
      print(HINT);
      setPhase("shell");
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  /* keep scrolled to the bottom */
  useEffect(() => {
    const el = contentRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typed, buffer, phase]);

  /* ---------- the shell ---------- */

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      print({ kind: "cmd", text: cmd || " " });
      if (!cmd) return;

      const word = cmd.split(/\s+/)[0].toLowerCase();
      const scrollTo = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

      switch (word) {
        case "help":
          print(
            { kind: "out", text: "available commands:" },
            { kind: "out", text: "  play       the game 🎮" },
            { kind: "out", text: "  services   what we do" },
            { kind: "out", text: "  work       see our projects" },
            { kind: "out", text: "  contact    start a conversation" },
            { kind: "out", text: "  lights     flip the theme" },
            { kind: "out", text: "  clear      tidy up" },
          );
          break;
        case "play":
        case "game":
        case "snake":
          gameRef.current = newGame();
          setPhase("game");
          break;
        case "services":
        case "ls":
          print(
            { kind: "out", text: "websites/   web-apps/   mobile-apps/" },
            { kind: "out", text: "design/     social/     repairs/" },
          );
          break;
        case "work":
          print({ kind: "ok", text: "✓ scrolling to the good stuff…" });
          scrollTo("work");
          break;
        case "contact":
          print({ kind: "ok", text: "✓ the form awaits — we reply fast." });
          scrollTo("contact");
          break;
        case "lights":
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          print({ kind: "ok", text: "💡 there we go." });
          break;
        case "whoami":
          print({ kind: "out", text: "a visitor with excellent taste." });
          break;
        case "coffee":
          print({ kind: "ok", text: "☕ brewing… done. priorities sorted." });
          break;
        case "sudo":
          print({ kind: "err", text: "nice try." });
          break;
        case "hello":
        case "hi":
        case "hey":
          print({ kind: "out", text: "hey! 👋 type help to see what I can do." });
          break;
        case "exit":
        case "quit":
          print({ kind: "out", text: "there's no escape. only websites." });
          break;
        case "clear":
          setLines([]);
          break;
        default:
          print({ kind: "err", text: `command not found: ${word} — try help` });
      }
    },
    [print, resolvedTheme, setTheme],
  );

  /* ---------- snake loop ---------- */

  useEffect(() => {
    if (phase !== "game") return;

    const step = () => {
      const g = gameRef.current;
      if (!g) return;
      g.dir = g.nextDir;
      const head: Cell = [g.snake[0][0] + g.dir[0], g.snake[0][1] + g.dir[1]];
      const hitWall = head[0] <= 0 || head[0] >= COLS - 1 || head[1] <= 0 || head[1] >= ROWS - 1;
      const hitSelf = g.snake.some(([x, y]) => x === head[0] && y === head[1]);

      if (hitWall || hitSelf) {
        const best = readBest();
        const isBest = g.score > best;
        if (isBest) writeBest(g.score);
        setPhase("shell");
        print(
          { kind: "err", text: `game over — score: ${g.score}` },
          isBest
            ? { kind: "ok", text: "★ new personal best!" }
            : { kind: "out", text: `personal best: ${Math.max(best, g.score)}` },
          { kind: "hint", text: "type play to go again" },
        );
        return;
      }

      g.snake.unshift(head);
      if (head[0] === g.food[0] && head[1] === g.food[1]) {
        g.score += 1;
        g.food = spawnFood(g.snake);
      } else {
        g.snake.pop();
      }
      setTick((t) => t + 1);
    };

    const interval = setInterval(step, TICK_MS);
    return () => clearInterval(interval);
  }, [phase, print]);

  const steer = useCallback((dx: number, dy: number) => {
    const g = gameRef.current;
    if (!g) return;
    if (dx === -g.dir[0] && dy === -g.dir[1]) return; // no 180° turns
    g.nextDir = [dx, dy];
  }, []);

  /* ---------- input handling ---------- */

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (phase === "game") {
      const k = e.key.toLowerCase();
      if (["arrowup", "w"].includes(k)) steer(0, -1);
      else if (["arrowdown", "s"].includes(k)) steer(0, 1);
      else if (["arrowleft", "a"].includes(k)) steer(-1, 0);
      else if (["arrowright", "d"].includes(k)) steer(1, 0);
      else if (["escape", "q"].includes(k)) {
        setPhase("shell");
        print(
          { kind: "out", text: `left the game — score: ${gameRef.current?.score ?? 0}` },
          { kind: "hint", text: "type play to go again" },
        );
      }
      e.preventDefault();
      return;
    }
    if (phase === "shell" && e.key === "Enter") {
      run(buffer);
      setBuffer("");
      e.preventDefault();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (phase !== "game") return;
    touchRef.current = [e.touches[0].clientX, e.touches[0].clientY];
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (phase !== "game" || !touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current[0];
    const dy = e.changedTouches[0].clientY - touchRef.current[1];
    touchRef.current = null;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) return;
    if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? 1 : -1, 0);
    else steer(0, dy > 0 ? 1 : -1);
  };

  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  /* ---------- render ---------- */

  const g = gameRef.current;

  return (
    <div
      ref={containerRef}
      className={cn("w-full font-mono text-xs", className)}
      onClick={focusInput}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={cn(
          "overflow-hidden rounded-lg border bg-neutral-900 shadow-2xl transition-colors",
          focused ? "border-emerald-700/60" : "border-neutral-800",
        )}
      >
        {/* title bar */}
        <div className="flex items-center gap-2 bg-neutral-800 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <span className="truncate text-xs text-neutral-400">
              {phase === "game" ? "snake — webworx arcade" : "webworx — bash"}
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* content */}
        <div
          ref={contentRef}
          className={cn(
            "no-visible-scrollbar relative cursor-text overflow-y-auto p-4 transition-[height] duration-300",
            phase === "game" ? "h-[27rem]" : "h-80",
          )}
          aria-live="polite"
        >
          {phase !== "game" && (
            <>
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  {line.kind === "cmd" ? (
                    <span>
                      <Prompt />
                      <CmdText text={line.text} />
                    </span>
                  ) : (
                    <span className={LINE_CLS[line.kind]}>{line.text}</span>
                  )}
                </div>
              ))}

              {/* demo typing line */}
              {phase === "demo" && (
                <div className="whitespace-pre-wrap leading-relaxed">
                  <Prompt />
                  <CmdText text={typed} />
                  <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-neutral-300 align-middle" />
                </div>
              )}

              {/* live prompt */}
              {phase === "shell" && (
                <div className="whitespace-pre-wrap leading-relaxed">
                  <Prompt />
                  <CmdText text={buffer} />
                  <span
                    className={cn(
                      "ml-0.5 inline-block h-4 w-2 align-middle",
                      focused ? "animate-pulse bg-emerald-400" : "bg-neutral-600",
                    )}
                  />
                </div>
              )}
            </>
          )}

          {phase === "game" && g && (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="text-sm leading-[1.12] tracking-[0.08em]">
                {Array.from({ length: ROWS }, (_, y) => (
                  <div key={y} className="whitespace-pre">
                    {Array.from({ length: COLS }, (_, x) => {
                      const border = x === 0 || x === COLS - 1 || y === 0 || y === ROWS - 1;
                      const isHead = g.snake[0][0] === x && g.snake[0][1] === y;
                      const isBody = !isHead && g.snake.some(([sx, sy]) => sx === x && sy === y);
                      const isFood = g.food[0] === x && g.food[1] === y;
                      if (border)
                        return (
                          <span key={x} className="text-neutral-700">
                            {y === 0 || y === ROWS - 1 ? "─" : "│"}
                          </span>
                        );
                      if (isHead)
                        return (
                          <span key={x} className="text-emerald-300">
                            █
                          </span>
                        );
                      if (isBody)
                        return (
                          <span key={x} className="text-emerald-500">
                            █
                          </span>
                        );
                      if (isFood)
                        return (
                          <span key={x} className="text-amber-300">
                            ●
                          </span>
                        );
                      return <span key={x}> </span>;
                    })}
                  </div>
                ))}
              </div>
              <p className="text-neutral-400">
                score: <span className="text-emerald-400">{g.score}</span>
                <span className="text-neutral-600"> · arrows / wasd / swipe · q to quit</span>
              </p>
            </div>
          )}

          {/* real input, visually hidden but focusable */}
          <input
            ref={inputRef}
            type="text"
            value={buffer}
            onChange={(e) => phase === "shell" && setBuffer(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="absolute h-px w-px opacity-0"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input — type help for commands, or play for a game"
          />
        </div>
      </div>
    </div>
  );
}
