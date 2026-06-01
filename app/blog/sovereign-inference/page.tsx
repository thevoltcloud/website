import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Why sovereign inference is an architecture problem",
  description: "Data residency you can prove beats data residency you promise.",
};

export default function Post() {
  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <p className="text-muted-foreground text-xs uppercase tracking-widest">2026-06-01</p>
      <h1 className="text-foreground mt-2 text-3xl font-bold text-balance">
        Why sovereign inference is an architecture problem, not a policy one
      </h1>
      <div className="text-muted-foreground mt-8 space-y-5 leading-relaxed">
        <p>
          Most &quot;data residency&quot; offerings are contractual: a clause says your data stays in a region,
          and you trust the provider&apos;s controls. That works until it doesn&apos;t — a misrouted request,
          a cross-region replica, an egress path nobody audited.
        </p>
        <p>
          Volt takes the opposite approach. Residency is a property of where the bytes physically are. There is
          no egress path to misconfigure: zero ingress, zero egress, zero inter-pod transfer, enforced by Cilium
          and SPIRE at the network layer. Your request is served in a metro and the response never crosses its boundary.
        </p>
        <p>
          On top of that, the SDK validates every response against your configured tier and metro. If a sovereign
          request somehow came back from the wrong place, the SDK raises and withholds the payload from your code.
          Server-side enforcement, network-level isolation, and client-side validation — three independent layers.
        </p>
        <p>
          The result: data residency you can prove, not just promise. That is the difference auditors care about.
        </p>
      </div>
      <div className="mt-10">
        <Button asChild>
          <Link href="/contact">Talk to us about sovereign deployments</Link>
        </Button>
      </div>
    </article>
  );
}
