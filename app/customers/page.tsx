import type { Metadata } from "next";
import { Landmark, HeartPulse, Building2, Sparkles } from "lucide-react";
import StatsSection from "@/components/stats-4";
import CallToAction from "@/components/call-to-action";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Who Volt is built for — regulated and sovereign-conscious organizations.",
};

const verticals = [
  {
    title: "Financial services",
    icon: Landmark,
    description:
      "Answer the regulator's residency question with proof, not paperwork. Inference and customer data stay inside the boundary.",
    points: [
      "Zero egress — data residency is structural, not contractual",
      "Immutable audit log per request, tied to tenant identity",
      "Sovereign tier with pod-pinned inference and attestation",
    ],
  },
  {
    title: "Healthcare",
    icon: HeartPulse,
    description:
      "Show auditors exactly where PHI was processed. It never leaves the metro, and attestation proves it.",
    points: [
      "In-region serving with no cross-border transfer",
      "Workload identity via SPIRE/SPIFFE SVIDs",
      "Cilium default-deny egress at L3/L4",
    ],
  },
  {
    title: "Public sector",
    icon: Building2,
    description:
      "Stand up sovereign-by-default workloads on a FedRAMP path — single-tenant, attested, in-region.",
    points: [
      "Zero-egress boundary maps to SC-7 boundary protection",
      "Measured-boot attestation on dedicated bare-metal (Vault)",
      "Western-origin Standard catalog by default",
    ],
  },
  {
    title: "AI-native products",
    icon: Sparkles,
    description:
      "Ship frontier models at Bedrock-beating prices — no egress bills, no rewrite, no surprises.",
    points: [
      "Llama 70B from $0.95/M — OpenAI-compatible drop-in",
      "Dedicated GPU leases scoped into your namespace",
      "25+ metro pods, 99.9% uptime SLA",
    ],
  },
];

export default function Customers() {
  return (
    <main>
      <section className="pt-32 pb-12">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Built for regulated workloads
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground text-balance">
            Volt is for organizations that need frontier inference in
            production and cannot let data leave a jurisdiction. We are
            launching with anchor customers, and design-partner slots are open.
          </p>
        </div>
      </section>

      <StatsSection />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {verticals.map((vertical) => {
              const Icon = vertical.icon;
              return (
                <Card key={vertical.title}>
                  <CardHeader>
                    <div className="bg-muted mb-3 flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle>{vertical.title}</CardTitle>
                    <CardDescription>{vertical.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      {vertical.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span aria-hidden className="text-primary">
                            &middot;
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
