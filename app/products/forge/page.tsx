import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, KeySquare, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CallToAction from "@/components/call-to-action";

export const metadata: Metadata = {
  title: "Volt Forge",
  description: "GPU-as-a-service. Dedicated leases in your namespace.",
};

const features = [
  {
    icon: Cpu,
    title: "NVIDIA B200 and L40S",
    description:
      "Dedicated GPU capacity in-metro. B200 for frontier training and inference, L40S for cost-efficient serving.",
  },
  {
    icon: KeySquare,
    title: "Scoped kubeconfig",
    description:
      "We hand you a scoped kubeconfig into a dedicated namespace. Bring your own workloads. Zero egress by default.",
  },
  {
    icon: Calendar,
    title: "Reserved discounts",
    description:
      "Reserve capacity and pay less. 45% off on-demand at 12 months, 60% off at 36 months.",
  },
];

const reservedTerms = [
  "On-demand: full flexibility at list rate",
  "12-month reserved: 45% off on-demand",
  "36-month reserved: 60% off on-demand, lands at $2.36/GPU/hr on B200",
];

export default function Page() {
  return (
    <main>
      <section className="bg-background py-16 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-primary text-sm font-medium">Volt Forge</p>
          <h1 className="text-foreground mt-3 text-balance text-4xl font-semibold md:text-5xl">
            GPU-as-a-service. Dedicated leases in your namespace.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            Reserved NVIDIA capacity in your customer&apos;s metro. A scoped
            kubeconfig into a dedicated namespace, not a shared queue. Your data
            never leaves the city.
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-primary text-4xl font-bold">$2.36/GPU/hr</span>
            <span className="text-muted-foreground text-sm">
              NVIDIA B200, 36-month reserved &mdash; 31% below CoreWeave list
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Request access</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="https://docs.volt.cloud">Read the docs</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="p-2">
                <CardHeader>
                  <feature.icon className="text-primary size-6" aria-hidden />
                  <CardTitle className="mt-4 text-lg">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <Card className="p-8 md:p-12">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">Reserved terms</CardTitle>
              <CardDescription className="mt-2 max-w-2xl">
                Forge is sold as reserved capacity. The longer you commit, the
                lower the rate. There&apos;s no egress fee and no inter-pod
                transfer &mdash; data residency is structural, not contractual.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 p-0">
              <ul className="space-y-3">
                {reservedTerms.map((term) => (
                  <li
                    key={term}
                    className="text-foreground flex items-start gap-3"
                  >
                    <Check
                      className="text-primary mt-0.5 size-5 shrink-0"
                      aria-hidden
                    />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <CallToAction />
    </main>
  );
}
