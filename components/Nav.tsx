import Link from "next/link";
import { Button } from "@/components/Button";
import { NAV, SITE } from "@/lib/site";

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-volt-navy/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-volt-paper">
          <span className="text-volt-yellow" aria-hidden>⚡</span> {SITE.name}
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-volt-silver md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-volt-paper">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href={SITE.docsUrl} className="hidden text-sm text-volt-silver hover:text-volt-paper sm:block">
            Docs
          </a>
          <Button href="/contact">Talk to us</Button>
        </div>
      </nav>
    </header>
  );
}
