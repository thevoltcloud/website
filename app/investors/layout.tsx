import Link from "next/link";
import { Logo } from "@/components/logo";

// Focused, confidential chrome for the investor room — no marketing nav,
// no newsletter footer. The marketing header/footer hide themselves on
// /investors* (see header.tsx / Footer.tsx).
export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Volt home" className="block size-fit">
            <Logo uniColor />
          </Link>
          <span className="text-muted-foreground text-xs">Investor Room</span>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs sm:flex-row sm:items-center">
          <span>Confidential — for the named recipient only. Please do not redistribute.</span>
          <span>© {new Date().getFullYear()} Volt</span>
        </div>
      </footer>
    </div>
  );
}
