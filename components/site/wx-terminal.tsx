"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* ============================================================
   The studio terminal: plays a short intro script, then goes
   LIVE — visitors can type commands, and `play` opens Snake
   in a near-fullscreen arcade modal.
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

/* ---------- snake (wrap-around walls, arcade modal) ---------- */

const COLS = 44;
const ROWS = 24;
const TICK_MS = 110;

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
    const c: Cell = [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)];
    if (!snake.some(([x, y]) => x === c[0] && y === c[1])) return c;
  }
}

function newGame(): Game {
  const cy = Math.floor(ROWS / 2);
  const cx = Math.floor(COLS / 2);
  const snake: Cell[] = [
    [cx, cy],
    [cx - 1, cy],
    [cx - 2, cy],
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

  const [gameState, setGameState] = useState<"count" | "run" | "dead">("count");
  const [countdown, setCountdown] = useState(3);
  const [best, setBest] = useState(0);
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

  const startGame = useCallback(() => {
    gameRef.current = newGame();
    setBest(readBest());
    setCountdown(3);
    setGameState("count");
    setPhase("game");
  }, []);

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
          startGame();
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
    [print, resolvedTheme, setTheme, startGame],
  );

  /* ---------- game: countdown ---------- */

  useEffect(() => {
    if (phase !== "game" || gameState !== "count") return;
    if (countdown <= 0) {
      setGameState("run");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 700);
    return () => clearTimeout(t);
  }, [phase, gameState, countdown]);

  /* ---------- game: main loop (walls wrap around) ---------- */

  const endGame = useCallback(
    (quit: boolean) => {
      const g = gameRef.current;
      const score = g?.score ?? 0;
      const prevBest = readBest();
      const isBest = score > prevBest;
      if (isBest) writeBest(score);
      setPhase("shell");
      if (quit) {
        print(
          { kind: "out", text: `left the game — score: ${score}` },
          { kind: "hint", text: "type play to go again" },
        );
      } else {
        print(
          { kind: "err", text: `game over — score: ${score}` },
          isBest
            ? { kind: "ok", text: "★ new personal best!" }
            : { kind: "out", text: `personal best: ${Math.max(prevBest, score)}` },
          { kind: "hint", text: "type play to go again" },
        );
      }
      inputRef.current?.focus({ preventScroll: true });
    },
    [print],
  );

  useEffect(() => {
    if (phase !== "game" || gameState !== "run") return;

    const step = () => {
      const g = gameRef.current;
      if (!g) return;
      g.dir = g.nextDir;
      // wrap-around: smashing into a wall just teleports you to the other side
      const head: Cell = [
        (g.snake[0][0] + g.dir[0] + COLS) % COLS,
        (g.snake[0][1] + g.dir[1] + ROWS) % ROWS,
      ];
      const hitSelf = g.snake.some(([x, y]) => x === head[0] && y === head[1]);

      if (hitSelf) {
        setGameState("dead");
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
  }, [phase, gameState]);

  /* dead: show GAME OVER briefly, then back to the shell */
  useEffect(() => {
    if (phase !== "game" || gameState !== "dead") return;
    const t = setTimeout(() => endGame(false), 1300);
    return () => clearTimeout(t);
  }, [phase, gameState, endGame]);

  const steer = useCallback((dx: number, dy: number) => {
    const g = gameRef.current;
    if (!g) return;
    if (dx === -g.dir[0] && dy === -g.dir[1]) return; // no 180° turns
    g.nextDir = [dx, dy];
  }, []);

  /* game keyboard: window-level while the modal is open */
  useEffect(() => {
    if (phase !== "game") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "w"].includes(k)) steer(0, -1);
      else if (["arrowdown", "s"].includes(k)) steer(0, 1);
      else if (["arrowleft", "a"].includes(k)) steer(-1, 0);
      else if (["arrowright", "d"].includes(k)) steer(1, 0);
      else if (["escape", "q"].includes(k)) endGame(true);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, steer, endGame]);

  /* lock page scroll while the arcade is open */
  useEffect(() => {
    if (phase !== "game") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  /* ---------- input handling (shell) ---------- */

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <>
      <div
        ref={containerRef}
        className={cn("w-full font-mono text-xs", className)}
        onClick={focusInput}
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
              <span className="truncate text-xs text-neutral-400">webworx — bash</span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* content */}
          <div
            ref={contentRef}
            className="no-visible-scrollbar relative h-80 cursor-text overflow-y-auto p-4"
            aria-live="polite"
          >
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
            {(phase === "shell" || phase === "game") && (
              <div className="whitespace-pre-wrap leading-relaxed">
                <Prompt />
                <CmdText text={phase === "game" ? "play" : buffer} />
                <span
                  className={cn(
                    "ml-0.5 inline-block h-4 w-2 align-middle",
                    focused && phase === "shell" ? "animate-pulse bg-emerald-400" : "bg-neutral-600",
                  )}
                />
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

      {/* ---------- arcade modal ---------- */}
      {phase === "game" && g && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Snake — the Webworx arcade"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 font-mono shadow-2xl">
            {/* title bar */}
            <div className="flex items-center gap-2 bg-neutral-800 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <button
                  aria-label="Quit game"
                  onClick={() => endGame(true)}
                  className="h-3 w-3 cursor-pointer rounded-full bg-red-500 hover:bg-red-400"
                />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-neutral-400">snake — webworx arcade</span>
              </div>
              <div className="w-[52px]" />
            </div>

            {/* board */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-6">
              <div
                className="rounded-lg border border-emerald-900/50 bg-[#0b1210] p-2 text-[11px] leading-[1.1] tracking-[0.06em] sm:p-3 sm:text-sm md:text-base"
                aria-hidden
              >
                {Array.from({ length: ROWS }, (_, y) => (
                  <div key={y} className="whitespace-pre">
                    {Array.from({ length: COLS }, (_, x) => {
                      const isHead = g.snake[0][0] === x && g.snake[0][1] === y;
                      const isBody = !isHead && g.snake.some(([sx, sy]) => sx === x && sy === y);
                      const isFood = g.food[0] === x && g.food[1] === y;
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

              {/* countdown / game over overlays */}
              {gameState === "count" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
                  <p
                    key={countdown}
                    className="animate-ping font-head text-7xl font-extrabold text-emerald-300 sm:text-8xl"
                  >
                    {countdown > 0 ? countdown : "GO"}
                  </p>
                  <p className="text-xs text-neutral-400 sm:text-sm">
                    arrows / wasd / swipe · walls wrap around · q to quit
                  </p>
                </div>
              )}
              {gameState === "dead" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70">
                  <p className="font-head text-5xl font-extrabold text-red-400 sm:text-6xl">GAME OVER</p>
                  <p className="text-sm text-neutral-300">
                    score: <span className="text-emerald-400">{g.score}</span>
                    {g.score > best && <span className="ml-2 text-amber-300">★ new best!</span>}
                  </p>
                </div>
              )}
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs text-neutral-400 sm:px-6">
              <span>
                score: <span className="text-emerald-400">{g.score}</span>
                <span className="ml-4 hidden sm:inline">best: {Math.max(best, g.score)}</span>
              </span>
              <span className="hidden text-neutral-500 sm:inline">walls wrap · eat the dots</span>
              <button
                onClick={() => endGame(true)}
                className="cursor-pointer text-neutral-400 underline-offset-2 hover:text-emerald-400 hover:underline"
              >
                quit (q)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
