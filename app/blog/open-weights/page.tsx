import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why we bet on open weights",
  description: "You can only prove where a model ran if you control the weights and the metal.",
};

export default function Post() {
  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <p className="text-muted-foreground text-xs uppercase tracking-widest">2026-06-02</p>
      <h1 className="text-foreground mt-2 text-3xl font-bold text-balance">
        Why we bet on open weights
      </h1>
      <div className="text-muted-foreground mt-8 space-y-5 leading-relaxed">
        <p>
          Sovereignty and open weights are the same bet. A closed API can&apos;t be pinned to a
          jurisdiction — the weights live in someone else&apos;s region, behind someone else&apos;s
          control plane. You can&apos;t attest to what you can&apos;t run.
        </p>
        <p>
          That trade-off used to cost quality. It doesn&apos;t anymore. Frontier open-weights models
          — Llama 3.3/4, Mistral, Gemma, Phi — are production-grade, and the gap to closed models has
          closed for the large majority of enterprise tasks. For the rest, customers bring their own
          fine-tunes, LoRA or full weights, which we always support.
        </p>
        <p>
          Open weights also let us hold a clear catalog policy. A Western-default Standard catalog
          runs for everyone; Chinese-origin models are opt-in and blocked by default for federal and
          regulated workloads. The choice is the customer&apos;s, made explicit in contract, not
          buried in a model provider&apos;s terms.
        </p>
        <p>
          Most of all, controlling the weights and the metal is what makes attestation real. Volt can
          prove which model ran, in which metro, on which hardware — because all three are inside the
          boundary, not rented from across a border.
        </p>
      </div>
      <div className="mt-10">
        <Button asChild>
          <Link href="/contact">Talk to us about sovereign deployments</Link>
        </Button>
      </div>
    </article>
  );
}
