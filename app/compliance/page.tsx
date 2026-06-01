import type { Metadata } from 'next'
import CallToAction from '@/components/call-to-action'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { ShieldCheck, Scale, BookLock } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Compliance',
    description: 'FedRAMP path, EU AI Act readiness, and a catalog policy built for regulated workloads.',
}

const pillars = [
    {
        icon: ShieldCheck,
        title: 'FedRAMP path',
        description: 'Authorization on the roadmap.',
        points: [
            'Zero egress and attestation map to SC-7 boundary protection.',
            'Audit by default: every request ties to a tenant identity in an immutable log.',
            'Sovereign-by-default Vault for single-tenant federal workloads.',
        ],
    },
    {
        icon: Scale,
        title: 'EU AI Act readiness',
        description: 'Run EU workloads in an EU metro.',
        points: [
            'In-region serving with no cross-border transfer.',
            'Audit logging on every inference request.',
            'Data residency is structural, not contractual.',
        ],
    },
    {
        icon: BookLock,
        title: 'Model catalog policy',
        description: 'Built for regulated workloads.',
        points: [
            'Western-origin Standard catalog runs by default.',
            'Extended catalog is opt-in only.',
            'Extended catalog is blocked by default for federal and regulated workloads.',
        ],
    },
]

export default function CompliancePage() {
    return (
        <main>
            <section className="pt-32 pb-12 md:pb-16">
                <div className="container mx-auto max-w-5xl px-6">
                    <h1 className="text-foreground text-balance text-4xl font-semibold md:text-5xl">Compliance</h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-balance text-lg">
                        FedRAMP path, EU AI Act readiness, and a catalog policy built for regulated workloads. Data residency that&apos;s structural, not contractual.
                    </p>
                </div>
            </section>

            <section className="pb-12 md:pb-24">
                <div className="container mx-auto max-w-5xl px-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {pillars.map((pillar) => (
                            <Card key={pillar.title}>
                                <CardHeader>
                                    <pillar.icon
                                        aria-hidden
                                        className="text-foreground size-6"
                                    />
                                    <CardTitle className="mt-2 text-xl">{pillar.title}</CardTitle>
                                    <CardDescription>{pillar.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-muted-foreground space-y-3 text-sm">
                                        {pillar.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex gap-2">
                                                <span
                                                    aria-hidden
                                                    className="text-foreground/40 mt-1">
                                                    &mdash;
                                                </span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <CallToAction />
        </main>
    )
}
