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
      <ContentSection />
      <CallToAction />
    </>
  );
}
