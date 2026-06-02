import type { Metadata } from 'next'
import { Card } from '@/components/ui/card'
import { Zap, Cpu, Lock, Server, BookOpen, Globe, CheckCircle2 } from 'lucide-react'
import { SITE } from '@/lib/site'

const docsHost = new URL(SITE.docsUrl).host
const siteHost = new URL(SITE.url).host

export const metadata: Metadata = {
    title: 'Status',
    description: 'Live operational status for Volt — Spark, Forge, Vault, the control plane, docs, and API.',
}

type Status = 'operational' | 'degraded' | 'maintenance' | 'outage'

const LABEL: Record<Status, string> = {
    operational: 'Operational',
    degraded: 'Degraded performance',
    maintenance: 'Under maintenance',
    outage: 'Outage',
}

// Dot + text colors per status. Operational matches the footer's emerald badge.
const TONE: Record<Status, { dot: string; pulse: string; text: string }> = {
    operational: { dot: 'bg-emerald-500', pulse: 'bg-emerald-400/60', text: 'text-emerald-500' },
    degraded: { dot: 'bg-amber-500', pulse: 'bg-amber-400/60', text: 'text-amber-500' },
    maintenance: { dot: 'bg-sky-500', pulse: 'bg-sky-400/60', text: 'text-sky-500' },
    outage: { dot: 'bg-red-500', pulse: 'bg-red-400/60', text: 'text-red-500' },
}

const components: { name: string; description: string; icon: typeof Zap; status: Status }[] = [
    { name: 'Volt Spark — Inference API', description: 'OpenAI-compatible token serving', icon: Zap, status: 'operational' },
    { name: 'Volt Forge — GPU provisioning', description: 'Dedicated GPU leases', icon: Cpu, status: 'operational' },
    { name: 'Volt Vault — Bare-metal', description: 'Single-tenant racks', icon: Lock, status: 'operational' },
    { name: 'Control plane & Console', description: 'Tenant management and scheduling', icon: Server, status: 'operational' },
    { name: 'Documentation', description: docsHost, icon: BookOpen, status: 'operational' },
    { name: 'Website & API gateway', description: `${siteHost} and edge`, icon: Globe, status: 'operational' },
]

const incidents: { date: string; title: string; detail: string }[] = []

function StatusDot({ status, size = 'sm' }: { status: Status; size?: 'sm' | 'lg' }) {
    const tone = TONE[status]
    const box = size === 'lg' ? 'size-3.5' : 'size-2.5'
    const core = size === 'lg' ? 'size-1.5' : 'size-1'
    return (
        <span className={`relative flex ${box}`}>
            <span className={`absolute inset-0 block size-full animate-pulse rounded-full ${tone.pulse}`} />
            <span className={`relative m-auto block ${core} rounded-full ${tone.dot}`} />
        </span>
    )
}

export default function StatusPage() {
    const allOperational = components.every((c) => c.status === 'operational')
    const overall: Status = allOperational
        ? 'operational'
        : components.some((c) => c.status === 'outage')
          ? 'outage'
          : components.some((c) => c.status === 'maintenance')
            ? 'maintenance'
            : 'degraded'
    const tone = TONE[overall]

    return (
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-3xl px-6">
                {/* Overall banner */}
                <Card className="flex items-center gap-4 p-6">
                    <span className={`bg-card ring-foreground/5 flex size-12 items-center justify-center rounded-full ring-1`}>
                        <StatusDot status={overall} size="lg" />
                    </span>
                    <div>
                        <h1 className="text-xl font-semibold md:text-2xl">
                            {overall === 'operational' ? 'All systems operational' : LABEL[overall]}
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            99.9% uptime SLA on Tier III infrastructure. Service credits apply at the 99.0% and 98.0%
                            breach thresholds.
                        </p>
                    </div>
                </Card>

                {/* Components */}
                <div className="mt-10">
                    <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Services</h2>
                    <div className="mt-4 divide-border divide-y rounded-xl border">
                        {components.map((c) => (
                            <div key={c.name} className="flex items-center gap-4 p-4">
                                <span className="bg-card text-muted-foreground ring-foreground/5 flex size-9 shrink-0 items-center justify-center rounded-lg ring-1">
                                    <c.icon className="size-4" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium">{c.name}</div>
                                    <div className="text-muted-foreground text-xs">{c.description}</div>
                                </div>
                                <span className={`flex items-center gap-2 text-sm ${TONE[c.status].text}`}>
                                    <StatusDot status={c.status} />
                                    <span className="max-sm:hidden">{LABEL[c.status]}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Incident history */}
                <div className="mt-10">
                    <h2 className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">
                        Incident history
                    </h2>
                    {incidents.length === 0 ? (
                        <Card className="mt-4 flex items-center gap-3 p-6">
                            <CheckCircle2 className="text-emerald-500 size-5 shrink-0" />
                            <p className="text-muted-foreground text-sm">No incidents reported in the last 90 days.</p>
                        </Card>
                    ) : (
                        <div className="mt-4 space-y-3">
                            {incidents.map((i) => (
                                <Card key={i.title} className="p-5">
                                    <div className="text-muted-foreground text-xs">{i.date}</div>
                                    <h3 className="mt-1 font-medium">{i.title}</h3>
                                    <p className="text-muted-foreground mt-1 text-sm">{i.detail}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer note */}
                <p className="text-muted-foreground mt-10 text-center text-xs">
                    Subscribe to product and status updates in the footer below, or reach us at{' '}
                    <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">
                        {SITE.contactEmail}
                    </a>
                    .
                </p>
            </div>
        </section>
    )
}
