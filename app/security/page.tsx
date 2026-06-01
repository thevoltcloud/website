import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description: "Zero egress, workload identity, and measured-boot attestation — security by architecture.",
};

export default function Security() {
  const items: [string, string][] = [
    ["Zero egress", "No ingress, egress, or inter-pod transfer. Data residency is structural, not contractual."],
    ["Workload identity", "SPIRE issues SPIFFE identities; nothing talks to anything without a verified SVID."],
    ["Network policy", "Cilium enforces default-deny egress at L3/L4 on every pod."],
    ["Measured-boot attestation", "Vault customers verify each node's boot chain before deploying sensitive workloads."],
    ["Signed supply chain", "Images are cosign-signed with SLSA L3 provenance; model manifests are signed and verified in-cluster."],
    ["Audit by default", "Every authenticated request maps to a tenant identity and is recorded in an immutable log."],
  ];
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Security</h1>
      <p className="mt-3 max-w-2xl text-volt-silver">
        Security is a property of the architecture, not a feature bolted on. The zero-egress posture means
        sensitive data never leaves the metro it lands in.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map(([title, body]) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-semibold text-volt-paper">{title}</h2>
            <p className="mt-2 text-sm text-volt-silver">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-volt-silver">
        Report a vulnerability to{" "}
        <a className="text-volt-yellow" href={`mailto:${SITE.securityEmail}`}>{SITE.securityEmail}</a> — never a public channel.
        Disclosure policy and PGP key are published in our security policy.
      </p>
    </div>
  );
}
