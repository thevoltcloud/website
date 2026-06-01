import type { Metadata } from "next";
import Contact from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request access to Volt or talk to the team.",
};

export default function ContactPage() {
  return <Contact />;
}
