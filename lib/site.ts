// Single source of marketing facts. Keep in sync with the product (pricing,
// SKUs, taglines) — cross-checked against the brand identity + locked decisions.
//
// Brand domain is voltcloud.ai. Base URLs are env-overridable so a deploy can
// run on another host (e.g. the interim volt.cuemby.cloud / docs.cuemby.cloud)
// without a code change — set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_DOCS_URL /
// NEXT_PUBLIC_STATUS_URL in the deployment environment.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltcloud.ai";
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.voltcloud.ai";
// Self-hosted status page lives at /status on the marketing site (brand-
// consistent). Override with NEXT_PUBLIC_STATUS_URL to point at a dedicated
// status subdomain later.
const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_URL ?? `${SITE_URL}/status`;

export const SITE = {
  name: "Volt",
  category: "The Sovereign Inference Cloud",
  tagline: "Run 70B models in your customer's metro. At Bedrock prices. Without your data leaving the city.",
  positioning:
    "For regulated and sovereign-conscious organizations that need frontier open-weights LLMs in production, Volt runs in the customer's metro with zero egress and cryptographic attestation.",
  url: SITE_URL,
  docsUrl: DOCS_URL,
  statusUrl: STATUS_URL,
  githubUrl: "https://github.com/thevoltcloud",
  contactEmail: "hello@voltcloud.ai",
  securityEmail: "security@voltcloud.ai",
} as const;

export interface Sku {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  headlinePrice: string;
  priceNote: string;
  bullets: string[];
}

export const SKUS: Sku[] = [
  {
    slug: "spark",
    name: "Volt Spark",
    icon: "⚡",
    summary: "Tokens-as-a-service. OpenAI-compatible.",
    headlinePrice: "$0.95/M",
    priceNote: "Llama 70B standard · $1.45/M sovereign tier",
    bullets: [
      "OpenAI drop-in — change the base URL and key",
      "Zero egress, in-metro serving",
      "Sovereign tier with pod-pinned inference + attestation",
    ],
  },
  {
    slug: "forge",
    name: "Volt Forge",
    icon: "🔥",
    summary: "GPU-as-a-service. Dedicated leases in your namespace.",
    headlinePrice: "$2.36/GPU/hr",
    priceNote: "NVIDIA B200, 36-month reserved — 31% below CoreWeave list",
    bullets: [
      "NVIDIA B200 and L40S capacity",
      "Scoped kubeconfig into a dedicated namespace",
      "Reserved terms: 45% off at 12-mo, 60% off at 36-mo",
    ],
  },
  {
    slug: "vault",
    name: "Volt Vault",
    icon: "🔒",
    summary: "Dedicated bare-metal. Sovereign by default.",
    headlinePrice: "$85K/mo",
    priceNote: "8-GPU B200 rack, 36-month",
    bullets: [
      "Single-tenant bare-metal racks",
      "Measured-boot attestation per node",
      "SPIFFE federation into your trust domain",
    ],
  },
];

export const NAV = [
  { label: "Spark", href: "/products/spark" },
  { label: "Forge", href: "/products/forge" },
  { label: "Vault", href: "/products/vault" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "Compliance", href: "/compliance" },
  { label: "Customers", href: "/customers" },
  { label: "Blog", href: "/blog" },
];
