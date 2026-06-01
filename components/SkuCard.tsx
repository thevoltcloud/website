import Link from "next/link";
import type { Sku } from "@/lib/site";

export function SkuCard({ sku }: { sku: Sku }) {
  return (
    <Link
      href={`/products/${sku.slug}`}
      className="block rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-volt-yellow/50"
    >
      <div className="text-2xl" aria-hidden>{sku.icon}</div>
      <h3 className="mt-3 text-lg font-semibold text-volt-paper">{sku.name}</h3>
      <p className="mt-1 text-sm text-volt-silver">{sku.summary}</p>
      <p className="mt-4 text-2xl font-bold text-volt-yellow">{sku.headlinePrice}</p>
      <p className="text-xs text-volt-silver">{sku.priceNote}</p>
    </Link>
  );
}
