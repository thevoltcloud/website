import { Button } from "@/components/Button";
import { SkuCard } from "@/components/SkuCard";
import { SITE, SKUS } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-volt-yellow">{SITE.category}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight text-volt-paper md:text-5xl">
          {SITE.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-volt-silver">
          Distributed Tier-3 inference across metro pods. Multi-vendor GPU, zero egress,
          Kubernetes-native. Frontier open-weights models in production — where your data has to stay.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/contact">Request access</Button>
          <Button href="/pricing" variant="secondary">See pricing</Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-6 md:grid-cols-3">
          {SKUS.map((sku) => (
            <SkuCard key={sku.slug} sku={sku} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-bold text-volt-paper">Why Volt</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[
            ["Zero egress", "No ingress, no egress, no inter-pod transfer. Your data never leaves the metro it lands in."],
            ["Cryptographic attestation", "Measured-boot proof of where your workload ran — verify it before you deploy."],
            ["Multi-vendor GPU", "NVIDIA today; AMD MI355X and Intel Gaudi 3 as the stack hardens. No single-vendor lock-in."],
            ["CNCF-native", "Built on llm-d, KServe, Kueue, Cilium, and SPIRE — and we contribute back upstream."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-semibold text-volt-paper">{title}</h3>
              <p className="mt-2 text-sm text-volt-silver">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-volt-yellow/30 bg-white/5 p-10 text-center">
          <h2 className="text-2xl font-bold text-volt-paper">OpenAI drop-in for Spark</h2>
          <p className="mx-auto mt-3 max-w-xl text-volt-silver">
            Point your existing OpenAI client at Volt — change the base URL and key.
          </p>
          <pre className="mx-auto mt-6 max-w-xl overflow-x-auto rounded-lg bg-volt-ink p-4 text-left text-sm text-volt-silver">
{`from volt import Volt

client = Volt(api_key="volt_sk_live_...")
resp = client.chat.completions.create(
    model="llama-3.3-70b-instruct",
    messages=[{"role": "user", "content": "Explain CAP theorem"}],
)`}
          </pre>
          <div className="mt-6 flex justify-center gap-4">
            <Button href={SITE.docsUrl}>Read the docs</Button>
          </div>
        </div>
      </section>
    </>
  );
}
