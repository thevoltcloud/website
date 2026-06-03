import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How in-metro inference beats Bedrock on price",
  description: "Lower prices and zero egress fall out of the pod economics, not a discount.",
};

export default function Post() {
  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <p className="text-muted-foreground text-xs uppercase tracking-widest">2026-06-02</p>
      <h1 className="text-foreground mt-2 text-3xl font-bold text-balance">
        How in-metro inference beats Bedrock on price
      </h1>
      <div className="text-muted-foreground mt-8 space-y-5 leading-relaxed">
        <p>
          Hyperscaler inference pricing bundles two costs that have nothing to do with serving a
          token: a data-transfer tax and the margin on a closed, rented model. Volt removes both,
          and the lower price is what&apos;s left.
        </p>
      <p>
        Pods run reserved, multi-vendor GPUs in Tier III metros. Committing capacity for 36 months
        lands an NVIDIA B200 at $2.36/GPU/hr — ~44% below CoreWeave reserved, ~78% below CoreWeave on-demand. That reserved base
        is the foundation of the unit economics; utilization climbs from 55% toward 88% as a pod
        fills, and pod-level EBITDA turns positive in year two.
      </p>
        <p>
          Open-weights models carry no per-token licensing markup. With Llama, Mistral, Gemma, and
          Phi, the cost is compute, not rent — so the savings reach the price sheet instead of a
          model vendor.
        </p>
      <p>
        And because the architecture is zero-egress, there are no transfer bills to surprise you
        at month end. Llama 70B runs at $0.95/M tokens standard and $1.45/M on the sovereign tier —
        with data that never leaves the metro.
      </p>
      </div>
      <div className="mt-10">
        <Button asChild>
          <Link href="/pricing">See the pricing</Link>
        </Button>
      </div>
    </article>
  );
}
