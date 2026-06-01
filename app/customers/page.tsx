import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Customers",
  description: "Who Volt is built for — regulated and sovereign-conscious organizations.",
};

export default function Customers() {
  const verticals = [
    ["Financial services", "Keep model inference and customer data inside the regulated boundary, in-metro."],
    ["Healthcare", "PHI never leaves the metro; attestation supports your auditors' questions."],
    ["Public sector", "Sovereign-by-default deployments with a FedRAMP path."],
    ["AI-native products", "Frontier open-weights models at Bedrock-beating prices, without egress surprises."],
  ];
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Built for regulated workloads</h1>
      <p className="mt-3 max-w-2xl text-volt-silver">
        Volt is for organizations that need frontier inference in production and cannot let data leave a
        jurisdiction. We are launching with anchor customers — design-partner slots are open.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {verticals.map(([title, body]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-semibold text-volt-paper">{title}</h2>
            <p className="mt-2 text-sm text-volt-silver">{body}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/contact">Become a design partner</Button>
      </div>
    </div>
  );
}
