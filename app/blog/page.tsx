import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the Volt team on sovereign inference, GPU economics, and the CNCF stack.",
};

const POSTS = [
  {
    slug: "sovereign-inference",
    title: "Why sovereign inference is an architecture problem, not a policy one",
    date: "2026-06-01",
    excerpt: "Data residency you can prove beats data residency you promise. Here's how zero egress changes the conversation.",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold text-volt-paper">Blog</h1>
      <ul className="mt-10 space-y-8">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group block">
              <p className="text-xs uppercase tracking-widest text-volt-silver">{p.date}</p>
              <h2 className="mt-1 text-xl font-semibold text-volt-paper group-hover:text-volt-yellow">{p.title}</h2>
              <p className="mt-2 text-volt-silver">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
