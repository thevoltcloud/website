import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { SITE, SKUS } from "@/lib/site";

const SLUG = "forge";
const sku = SKUS.find((s) => s.slug === SLUG)!;

export const metadata: Metadata = { title: sku.name, description: sku.summary };

export default function Page() {
  if (!sku) notFound();
  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-3xl" aria-hidden>{sku.icon}</div>
      <h1 className="mt-4 text-4xl font-bold text-volt-paper">{sku.name}</h1>
      <p className="mt-3 text-lg text-volt-silver">{sku.summary}</p>
      <p className="mt-8 text-3xl font-bold text-volt-yellow">{sku.headlinePrice}</p>
      <p className="text-sm text-volt-silver">{sku.priceNote}</p>
      <ul className="mt-8 space-y-3">
        {sku.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-volt-paper">
            <span className="text-volt-yellow" aria-hidden>—</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 flex gap-4">
        <Button href="/contact">Request access</Button>
        <Button href={SITE.docsUrl} variant="secondary">Docs</Button>
      </div>
    </article>
  );
}
