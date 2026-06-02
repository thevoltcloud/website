import type { Metadata } from "next";
import ContentSection from "@/components/content-2";
import CallToAction from "@/components/call-to-action";
import { Card } from "@/components/ui/card";
import { Lock, ShieldCheck, Fingerprint, Network, Cpu, FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Zero egress, workload identity, and measured-boot attestation — security by architecture.",
};

const pillars = [
  {
    icon: Lock,
    title: "Zero egress",
    body: "Zero ingress, zero egress, zero inter-pod transfer. There is no path off the box for data to take.",
  },
  {
    icon: Network,
    title: "Default-deny network",
    body: "Cilium enforces default-deny egress at L3/L4. A pod reaches only the endpoints its policy names.",
  },
  {
    icon: Fingerprint,
    title: "Workload identity",
    body: "SPIRE issues short-lived SPIFFE SVIDs to every service. No shared secrets, no long-lived credentials.",
  },
  {
    icon: Cpu,
    title: "Measured-boot attestation",
    body: "Firmware, kernel, and runtime are measured per node. A node that fails attestation never serves a request.",
  },
  {
    icon: FileCheck2,
    title: "Signed supply chain",
    body: "Images are cosign-signed with SLSA L3 provenance. Every running container traces to a known build.",
  },
  {
    icon: ShieldCheck,
    title: "Audit by default",
    body: "Every request is bound to a tenant identity and written to an immutable log. Residency you can prove.",
  },
];

export default function Security() {
  return (
    <>
      <section className="pt-32 pb-4 md:pb-8">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">
            Security you can prove, not just promise
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-balance text-lg">
            Volt makes data residency a property of the architecture. Zero egress,
            workload identity, and measured-boot attestation — independent layers
            an auditor can verify, not a clause you have to trust.
          </p>
        </div>
      </section>

      <section className="pb-4 md:pb-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <Card key={p.title} className="p-6">
                <p.icon className="text-primary size-6" aria-hidden />
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ContentSection />
      <CallToAction />
    </>
  );
}
