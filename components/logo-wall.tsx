import {
    siNvidia,
    siAmd,
    siIntel,
    siSupermicro,
    siKubernetes,
    siCncf,
    siCilium,
    siHelm,
    siPrometheus,
    siLinuxfoundation,
    type SimpleIcon,
} from 'simple-icons'

// Monochrome brand strip — the real silicon partners + CNCF stack Volt builds on.
// Rendered single-tone (currentColor) for a cohesive look on the dark theme and to
// sidestep colored-logo brand-guideline issues; marks come from simple-icons.
const logos: SimpleIcon[] = [
    siNvidia,
    siAmd,
    siIntel,
    siSupermicro,
    siKubernetes,
    siCncf,
    siCilium,
    siHelm,
    siPrometheus,
    siLinuxfoundation,
]

export default function LogoWall() {
    return (
        <section className="bg-background py-16">
            <div className="mx-auto max-w-5xl px-6">
                <h2 className="text-muted-foreground mb-10 text-center text-sm font-medium">
                    Built on a multi-vendor, CNCF-native stack
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
                    {logos.map((logo) => (
                        <svg
                            key={logo.title}
                            role="img"
                            viewBox="0 0 24 24"
                            aria-label={logo.title}
                            className="text-foreground/45 hover:text-foreground/80 h-7 w-auto fill-current transition-colors duration-200">
                            <title>{logo.title}</title>
                            <path d={logo.path} />
                        </svg>
                    ))}
                </div>
            </div>
        </section>
    )
}
