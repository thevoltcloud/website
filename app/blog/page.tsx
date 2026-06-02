import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the Volt team on sovereign inference, GPU economics, and the CNCF stack.",
};

const POSTS = [
  {
    slug: "in-metro-economics",
    title: "How in-metro inference beats Bedrock on price",
    date: "2026-06-02",
    excerpt: "Lower prices and zero egress aren't a promo. They fall out of the pod economics — reserved GPUs, open weights, and no data-transfer tax.",
  },
  {
    slug: "open-weights",
    title: "Why we bet on open weights",
    date: "2026-06-02",
    excerpt: "Sovereignty and open weights are the same bet: you can only prove where a model ran if you control the weights and the metal.",
  },
  {
    slug: "sovereign-inference",
    title: "Why sovereign inference is an architecture problem, not a policy one",
    date: "2026-06-01",
    excerpt: "Data residency you can prove beats data residency you promise. Here's how zero egress changes the conversation.",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
      <h1 className="text-4xl font-bold text-foreground">Blog</h1>
      <ul className="mt-10 space-y-8">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.date}</p>
              <h2 className="mt-1 text-xl font-semibold text-foreground group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 text-muted-foreground">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
