"use client";

import { useState } from "react";
import { SectionHeading } from "./section-heading";

const CONTACT_EMAIL = "hello" + "@" + "moali.co.za"; // contact inbox — swap for a studio address any time
const ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

const services = [
  "Website",
  "Custom Web App",
  "Mobile App",
  "Graphic Design",
  "Social Media Management",
  "Device Repair (Thermal Optics)",
  "Other / Not sure yet",
];

const inputClass =
  "w-full rounded-lg border border-white/15 bg-[#0a1512]/70 px-3.5 py-3 font-mono text-sm text-[#e8f2ee] placeholder:text-[#9db5ac]/60 transition focus:border-brand focus:shadow-[0_0_0_3px_rgba(0,168,120,0.18)] focus:outline-none";

type Status = { kind: "idle" | "sending" | "ok" | "err"; mailto?: string };

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_honey")) return; // bot

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "").trim();

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          service,
          message,
          _subject: "New enquiry — Webworx Studio",
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();
      form.reset();
      setStatus({ kind: "ok" });
    } catch {
      const subject = encodeURIComponent("New enquiry — Webworx Studio");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${message}`,
      );
      setStatus({
        kind: "err",
        mailto: `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`,
      });
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-20">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="get_in_touch" title="Have a project in mind?" />
          <p className="-mt-4 max-w-[48ch] leading-relaxed text-mut">
            Tell us what you&apos;re building — or what needs fixing — and we&apos;ll get
            back to you with straight answers, not a sales pitch.
          </p>
          <p className="mt-6 font-mono text-sm text-mut">
            <span className="text-accent">$</span> response_time:{" "}
            <span className="text-fg">usually &lt;24h</span>
          </p>
        </div>

        {/* the terminal form stays dark in both themes, deliberately */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#132a23] to-[#0e1f1a] shadow-[0_24px_56px_rgba(13,31,26,0.32)]"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0a1512]/70 px-4 py-3 font-mono text-xs text-[#9db5ac]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2.5">new_message.sh</span>
          </div>
          <div className="grid gap-4 p-6">
            <label className="grid gap-2 font-mono text-xs text-[#9db5ac]" htmlFor="f-name">
              <span>
                <span className="text-[#2bd79a]">$</span> your_name{" "}
                <span className="text-[#2bd79a]" aria-hidden>*</span>
              </span>
              <input id="f-name" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" className={inputClass} />
            </label>
            <label className="grid gap-2 font-mono text-xs text-[#9db5ac]" htmlFor="f-email">
              <span>
                <span className="text-[#2bd79a]">$</span> your_email{" "}
                <span className="text-[#2bd79a]" aria-hidden>*</span>
              </span>
              <input id="f-email" name="email" type="email" autoComplete="email" required placeholder="jane@company.com" className={inputClass} />
            </label>
            <label className="grid gap-2 font-mono text-xs text-[#9db5ac]" htmlFor="f-service">
              <span>
                <span className="text-[#2bd79a]">$</span> service
              </span>
              <select id="f-service" name="service" className={inputClass + " appearance-none"}>
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 font-mono text-xs text-[#9db5ac]" htmlFor="f-message">
              <span>
                <span className="text-[#2bd79a]">$</span> your_message{" "}
                <span className="text-[#2bd79a]" aria-hidden>*</span>
              </span>
              <textarea id="f-message" name="message" rows={4} required placeholder="Tell us about your project…" className={inputClass + " min-h-[110px] resize-y"} />
            </label>
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="w-full cursor-pointer rounded-xl bg-brand px-6 py-3.5 font-mono text-sm font-semibold text-[#04110c] shadow-[0_8px_24px_rgba(0,168,120,0.3)] transition hover:bg-[#00b487] disabled:opacity-70"
            >
              {status.kind === "sending" ? "> sending…" : "> send_message()"}
            </button>
            <p role="status" aria-live="polite" className="min-h-[1.2em] font-mono text-xs">
              {status.kind === "ok" && (
                <span className="text-[#2bd79a]">✓ message_sent — we&apos;ll get back to you soon.</span>
              )}
              {status.kind === "err" && (
                <span className="text-[#ff5f56]">
                  ✗ send_failed —{" "}
                  <a href={status.mailto} className="text-[#2bd79a] underline">
                    email us directly instead
                  </a>
                  .
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
