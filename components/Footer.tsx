import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-volt-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 font-bold text-volt-paper">
            <span className="text-volt-yellow" aria-hidden>⚡</span> {SITE.name}
          </div>
          <p className="mt-3 text-sm text-volt-silver">{SITE.category}.</p>
          <div className="mt-4">
            <StatusBadge />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-volt-silver">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-volt-paper">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={SITE.docsUrl} className="hover:text-volt-paper">Docs</a>
          </li>
          <li>
            <a href={SITE.githubUrl} className="hover:text-volt-paper">GitHub</a>
          </li>
        </ul>
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-volt-silver/60">
        © 2026 Volt (Cuemby, Inc.). {SITE.contactEmail}
      </div>
    </footer>
  );
}
