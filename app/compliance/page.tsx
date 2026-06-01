import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
  description: "FedRAMP path, EU AI Act readiness, and a catalog policy built for regulated workloads.",
};

export default function Compliance() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Compliance</h1>
      <p className="mt-3 max-w-2xl text-volt-silver">
        Volt is built sovereign-first. In-metro serving and zero egress make data residency verifiable,
        which simplifies the regulatory conversation.
      </p>
      <div className="mt-10 space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-volt-paper">FedRAMP</h2>
          <p className="mt-2 text-sm text-volt-silver">
            The zero-egress, attested architecture maps cleanly onto controls like SC-7 (boundary protection).
            FedRAMP authorization is on the roadmap; a FedRAMP-flavored control plane is part of the build-out.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-volt-paper">EU AI Act</h2>
          <p className="mt-2 text-sm text-volt-silver">
            In-region serving and audit logging support obligations taking effect across 2026. Run EU workloads
            in an EU metro with no cross-border transfer.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-semibold text-volt-paper">Model catalog policy</h2>
          <p className="mt-2 text-sm text-volt-silver">
            The standard catalog (Western-origin open weights) is the default. The extended catalog is opt-in and
            blocked by default for federal and regulated workloads.
          </p>
        </div>
      </div>
    </div>
  );
}
