"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "done" | "error";

export function LeadForm() {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "done" : "error");
      if (res.ok) form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="rounded-md bg-white/5 p-4 text-volt-paper">Thanks — we&apos;ll be in touch shortly.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="name" required placeholder="Name" className="rounded-md border border-white/15 bg-volt-ink px-4 py-2.5 text-volt-paper placeholder:text-volt-silver/50" />
      <input name="email" type="email" required placeholder="Work email" className="rounded-md border border-white/15 bg-volt-ink px-4 py-2.5 text-volt-paper placeholder:text-volt-silver/50" />
      <input name="company" placeholder="Company" className="rounded-md border border-white/15 bg-volt-ink px-4 py-2.5 text-volt-paper placeholder:text-volt-silver/50" />
      <textarea name="message" rows={4} placeholder="What are you building?" className="rounded-md border border-white/15 bg-volt-ink px-4 py-2.5 text-volt-paper placeholder:text-volt-silver/50" />
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-md bg-volt-yellow px-5 py-2.5 text-sm font-semibold text-volt-navy hover:bg-yellow-400 disabled:opacity-60"
      >
        {state === "submitting" ? "Sending…" : "Request access"}
      </button>
      {state === "error" && <p className="text-sm text-volt-signal">Something went wrong. Email {`${"hello@volt.cloud"}`} instead.</p>}
    </form>
  );
}
