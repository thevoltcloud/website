import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request access to Volt or talk to the team.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Request access</h1>
      <p className="mt-3 text-volt-silver">
        Tell us what you&apos;re building. For sales, email{" "}
        <a className="text-volt-yellow" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
      </p>
      <div className="mt-10">
        <LeadForm />
      </div>
    </div>
  );
}
