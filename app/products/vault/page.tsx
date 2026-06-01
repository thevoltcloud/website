import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import CallToAction from '@/components/call-to-action'
import { Server, ShieldCheck, Fingerprint, Lock, ScrollText, MapPin } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Volt Vault',
    description: 'Dedicated bare-metal. Sovereign by default.',
}

const features = [
    {
        icon: Server,
        title: 'Single-tenant bare-metal',
        description: 'A dedicated 8-GPU NVIDIA B200 rack reserved to you. No noisy neighbors, no shared control plane.',
    },
    {
        icon: ShieldCheck,
        title: 'Measured-boot attestation',
        description: 'Every node proves its boot chain before it serves. Firmware, kernel, and runtime measured into a TPM and verified.',
    },
    {
        icon: Fingerprint,
        title: 'SPIFFE federation',
        description: 'Federate Vault into your own trust domain. Workloads carry SPIRE-issued SVIDs your services already trust.',
    },
    {
        icon: Lock,
        title: 'Zero egress by structure',
        description: 'Cilium default-deny egress at L3/L4. Data residency is structural, not a contract clause.',
    },
    {
        icon: MapPin,
        title: 'Sovereign by default',
        description: 'Pinned to the metro you choose. No cross-border transfer, no inter-pod movement. Run EU workloads in an EU metro.',
    },
    {
        icon: ScrollText,
        title: 'Audit by default',
        description: 'Every request maps to a tenant identity and lands in an immutable log. Cosign-signed images, SLSA L3 provenance.',
    },
]

const specs = [
    { label: 'GPUs', value: '8x NVIDIA B200 per rack' },
    { label: 'Tenancy', value: 'Single-tenant bare-metal' },
    { label: 'Term', value: '36-month reserved' },
    { label: 'Uptime SLA', value: '99.9% (Tier III)' },
    { label: 'Attestation', value: 'Measured-boot, per node' },
    { label: 'Identity', value: 'SPIFFE / SPIRE federation' },
]

export default function Page() {
    return (
        <main>
            <section className="bg-background pt-24 pb-12 md:pt-32 md:pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <span className="text-primary text-sm font-medium">Volt Vault</span>
                    <h1 className="text-foreground mt-3 text-balance text-4xl font-semibold md:text-5xl">
                        Dedicated bare-metal. Sovereign by default.
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl text-balance text-lg">
                        Single-tenant B200 racks pinned to your metro, with measured-boot attestation per node and
                        SPIFFE federation into your trust domain. For workloads where the data can&apos;t leave the city.
                    </p>
                    <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-primary text-4xl font-semibold">$85K/mo</span>
                        <span className="text-muted-foreground text-sm">8-GPU B200 rack, 36-month reserved</span>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/contact">Request access</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="https://docs.voltcloud.ai">Read the docs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="bg-background py-12 md:py-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <Card key={feature.title} className="p-6">
                                <CardHeader className="p-0">
                                    <feature.icon
                                        className="text-primary size-6"
                                        aria-hidden
                                    />
                                    <CardTitle className="mt-4 text-lg">{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-background pb-12 md:pb-24">
                <div className="mx-auto max-w-5xl px-6">
                    <Card className="p-8 md:p-12">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl md:text-3xl">Rack specifications</CardTitle>
                            <CardDescription>What ships in a Vault deployment.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                                {specs.map((spec) => (
                                    <div key={spec.label}>
                                        <dt className="text-muted-foreground text-sm">{spec.label}</dt>
                                        <dd className="text-foreground mt-1 font-medium">{spec.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <CallToAction />
        </main>
    )
}
