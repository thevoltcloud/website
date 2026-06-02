import type { Metadata } from "next";
import ContentSection from "@/components/content-2";
import CallToAction from "@/components/call-to-action";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Zero egress, workload identity, and measured-boot attestation — security by architecture.",
};

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
            workload identity, and measured-boot attestation — five independent
            layers that an auditor can verify, not a clause you have to trust.
          </p>
        </div>
      </section>
      <ContentSection />
      <CallToAction />
    </>
  );
}
