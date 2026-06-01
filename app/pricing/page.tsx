import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { SKUS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing across Spark, Forge, and Vault. Zero egress fees, ever.",
};

export default function Pricing() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Pricing</h1>
      <p className="mt-3 max-w-2xl text-volt-silver">
        No egress fees, ever. Reserved terms cut the rate: 45% off on-demand at 12-month, 60% off at 36-month.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {SKUS.map((sku) => (
          <div key={sku.slug} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-2xl" aria-hidden>{sku.icon}</div>
            <h2 className="mt-3 text-lg font-semibold text-volt-paper">{sku.name}</h2>
            <p className="mt-4 text-3xl font-bold text-volt-yellow">{sku.headlinePrice}</p>
            <p className="text-xs text-volt-silver">{sku.priceNote}</p>
            <ul className="mt-5 space-y-2 text-sm text-volt-silver">
              {sku.bullets.map((b) => (
                <li key={b}>· {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-volt-paper">How Spark compares</h2>
        <p className="mt-2 text-sm text-volt-silver">
          Spark standard runs Llama 70B at $0.95/M. The sovereign tier is $1.45/M — still 45% below
          AWS Bedrock ($2.65/M), with in-metro serving and attestation that hyperscalers don&apos;t offer at any price.
        </p>
      </div>

      <div className="mt-10">
        <Button href="/contact">Get a quote</Button>
      </div>
    </div>
  );
}
