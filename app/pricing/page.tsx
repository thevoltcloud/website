import type { Metadata } from "next";
import Pricing from "@/components/pricing";
import FAQs from "@/components/faqs-2";
import CallToAction from "@/components/call-to-action";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing across Spark, Forge, and Vault. Zero egress fees, ever.",
};

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <FAQs />
      <CallToAction />
    </>
  );
}
