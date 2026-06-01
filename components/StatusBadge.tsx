import { SITE } from "@/lib/site";

// Links to the public status page. The live operational state is sourced from
// status.volt.cloud; this badge is a static entry point.
export function StatusBadge() {
  return (
    <a
      href={SITE.statusUrl}
      className="inline-flex items-center gap-2 rounded-full border border-volt-silver/30 px-3 py-1 text-xs text-volt-silver hover:text-volt-paper"
    >
      <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
      System status
    </a>
  );
}
