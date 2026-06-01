import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderOne from "@/components/header";
import FooterSection from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.category}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.name} — ${SITE.category}`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderOne />
          <main className="min-h-[60vh]">{children}</main>
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}
