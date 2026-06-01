import type { Metadata } from 'next'
import Link from 'next/link'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InvestorLogout } from '@/components/investor-logout'
import { FileText, FileSpreadsheet, Presentation, FileBox, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Investor Room',
    description: 'Confidential investor materials for Volt.',
    robots: { index: false, follow: false },
}

// Render per request so the confidential figures are never baked into static
// output — they're served only to authenticated viewers (middleware-gated).
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Confidential numbers live ONLY in the gitignored investor-assets/ dir, never
// in the (public) repo source. Read at runtime; fall back gracefully if absent.
type Metric = { value: string; label: string; sub: string }
type Financial = { metric: string; y: string[] }
type Round = { round: string; year: string; raise: string; post: string; use: string }
type Ask = { raise: string; seriesA: string; seriesAWindow: string }
type InvestorData = { ask: Ask; metrics: Metric[]; financials: Financial[]; rounds: Round[] }

async function loadData(): Promise<InvestorData | null> {
    try {
        const raw = await readFile(
            path.join(process.cwd(), 'investor-assets', 'investor-data.json'),
            'utf8',
        )
        return JSON.parse(raw) as InvestorData
    } catch {
        return null
    }
}

const team = [
    { name: 'Angel Ramirez', role: 'CEO', note: 'CNCF Ambassador · founder of Cuemby' },
    { name: 'Cristher Castro', role: 'CCO', note: 'Talent, financial discipline, international ops' },
    { name: 'Hitomi Mizugaki', role: 'CPO', note: 'Product, agile, investor + customer growth' },
]

const dataRoom = [
    { key: 'two-pager', title: 'Two-pager', format: 'PDF', icon: FileText, note: 'The one-glance overview.' },
    { key: 'investor-deck', title: 'Investor deck', format: 'PPTX', icon: Presentation, note: '15-slide live-meeting deck.' },
    { key: 'series-a-deck', title: 'Series A deck', format: 'PPTX', icon: Presentation, note: '22-slide Series A narrative.' },
    { key: 'financial-model', title: 'Financial model', format: 'XLSX', icon: FileSpreadsheet, note: 'Live 5-year, formula-driven.' },
    { key: 'execution-plan', title: '90-day execution plan', format: 'DOCX', icon: FileBox, note: 'Gantt + risk register.' },
]

const years = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5']

export default async function InvestorRoomPage() {
    const data = await loadData()

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest">
                        <ShieldCheck className="text-primary size-3.5" />
                        Confidential · Investor Room
                    </span>
                    <InvestorLogout />
                </div>

                {/* The ask */}
                <div className="mt-10 max-w-3xl">
                    <h1 className="text-balance text-4xl font-semibold md:text-5xl">
                        The Sovereign Inference Cloud
                    </h1>
                    <p className="text-muted-foreground mt-5 text-balance text-lg">
                        Run 70B models in your customer&apos;s metro, at Bedrock prices, without their data leaving
                        the city.
                        {data && (
                            <>
                                {' '}
                                Volt is raising a{' '}
                                <span className="text-foreground font-medium">{data.ask.raise}</span> to ship Pod #0,
                                the v0 software stack, and lock five anchor partners — the on-ramp to a{' '}
                                {data.ask.seriesA} {data.ask.seriesAWindow}.
                            </>
                        )}
                    </p>
                </div>

                {!data && (
                    <Card className="mt-10 p-6">
                        <p className="text-muted-foreground text-sm">
                            Investor figures are temporarily unavailable. Please reach out to{' '}
                            <a href="mailto:angel@cuemby.com" className="text-primary hover:underline">
                                angel@cuemby.com
                            </a>
                            .
                        </p>
                    </Card>
                )}

                {data && (
                    <>
                        {/* Metrics */}
                        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {data.metrics.map((m) => (
                                <Card key={m.label} className="p-6">
                                    <div className="text-primary text-3xl font-semibold">{m.value}</div>
                                    <div className="mt-2 text-sm font-medium">{m.label}</div>
                                    <div className="text-muted-foreground mt-1 text-xs">{m.sub}</div>
                                </Card>
                            ))}
                        </div>

                        {/* Financials */}
                        <section className="mt-16">
                            <h2 className="text-2xl font-semibold">Five-year base case</h2>
                            <p className="text-muted-foreground mt-2 text-sm">
                                Locked model. Utilization 55% → 88%, 400 kW per pod, 12 racks. Full workbook in the
                                data room.
                            </p>
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
                                    <thead>
                                        <tr className="text-muted-foreground text-left">
                                            <th className="border-b py-3 pr-4 font-medium">Metric</th>
                                            {years.map((y) => (
                                                <th key={y} className="border-b py-3 pr-4 text-right font-medium">
                                                    {y}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.financials.map((row) => (
                                            <tr key={row.metric}>
                                                <td className="border-b py-3 pr-4 font-medium">{row.metric}</td>
                                                {row.y.map((v, i) => (
                                                    <td
                                                        key={i}
                                                        className="text-muted-foreground border-b py-3 pr-4 text-right tabular-nums">
                                                        {v}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Funding roadmap */}
                        <section className="mt-16">
                            <h2 className="text-2xl font-semibold">Funding roadmap</h2>
                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                {data.rounds.map((r) => (
                                    <Card key={r.round} className="p-6">
                                        <div className="flex items-baseline justify-between">
                                            <h3 className="font-semibold">{r.round}</h3>
                                            <span className="text-muted-foreground text-xs">{r.year}</span>
                                        </div>
                                        <div className="mt-3 flex items-baseline gap-2">
                                            <span className="text-primary text-2xl font-semibold">{r.raise}</span>
                                            <span className="text-muted-foreground text-sm">raise · {r.post} post</span>
                                        </div>
                                        <p className="text-muted-foreground mt-3 text-sm">{r.use}</p>
                                    </Card>
                                ))}
                            </div>
                            <p className="text-muted-foreground mt-4 text-xs">
                                Separate non-dilutive GPU sale-leaseback provides $15M–$200M of capital across the
                                plan.
                            </p>
                        </section>
                    </>
                )}

                {/* Team */}
                <section className="mt-16">
                    <h2 className="text-2xl font-semibold">Team</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {team.map((t) => (
                            <Card key={t.name} className="p-6">
                                <h3 className="font-semibold">{t.name}</h3>
                                <div className="text-primary text-sm font-medium">{t.role}</div>
                                <p className="text-muted-foreground mt-2 text-sm">{t.note}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Data room */}
                <section className="mt-16">
                    <h2 className="text-2xl font-semibold">Data room</h2>
                    <p className="text-muted-foreground mt-2 text-sm">Confidential. Please do not redistribute.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {dataRoom.map((d) => (
                            <a
                                key={d.key}
                                href={`/api/investors/download?file=${d.key}`}
                                className="group bg-card/50 ring-border hover:bg-card flex items-center gap-4 rounded-xl border border-transparent p-4 ring-1 transition-colors">
                                <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                                    <d.icon className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-2 font-medium">
                                        {d.title}
                                        <span className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                                            {d.format}
                                        </span>
                                    </span>
                                    <span className="text-muted-foreground block text-sm">{d.note}</span>
                                </span>
                                <ArrowRight className="text-muted-foreground size-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </a>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="mt-16">
                    <Card className="flex flex-col items-start justify-between gap-4 p-8 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Let&apos;s talk</h2>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Questions, diligence requests, or to discuss terms — reach Angel directly.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="mailto:angel@cuemby.com">angel@cuemby.com</Link>
                        </Button>
                    </Card>
                </section>
            </div>
        </div>
    )
}
