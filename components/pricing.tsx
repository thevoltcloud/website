'use client'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { CardTitle, CardDescription } from '@/components/ui/card'
import { useState } from 'react'
import NumberFlow from '@number-flow/react'

type Term = 'onDemand' | 'reserved'

export default function Pricing() {
    const [term, setTerm] = useState<Term>('reserved')

    // Reserved = best 36-month rate (60% off on-demand — the locked reserved discount).
    // Spark is per-token (no term pricing); it stays flat and the subtext explains why.
    const prices = {
        forge: { onDemand: 5.9, reserved: 2.36 },
        vault: { onDemand: 212500, reserved: 85000 },
    }

    const note = {
        spark: term === 'reserved' ? 'Standard rate · committed volume' : 'Standard rate · pay-as-you-go',
        forge: term === 'reserved' ? 'NVIDIA B200 · 36-mo reserved' : 'NVIDIA B200 · on-demand',
        vault: term === 'reserved' ? '8-GPU B200 rack · 36-mo' : '8-GPU B200 rack · monthly',
    }

    return (
        <section className="bg-background relative py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl lg:tracking-tight">Pricing that scales from token to bare metal</h2>
                    <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance text-lg">Three ways to run frontier open-weights models in your customer&apos;s metro. Zero egress on every tier.</p>

                    <div className="my-12">
                        <div
                            data-term={term}
                            className="bg-foreground/5 *:text-foreground/75 relative mx-auto grid w-fit grid-cols-2 rounded-full p-1 *:block *:h-8 *:w-28 *:rounded-full *:text-sm *:hover:opacity-75">
                            <div
                                aria-hidden
                                className="bg-card in-data-[term=onDemand]:translate-x-0 ring-foreground/5 pointer-events-none absolute inset-1 w-1/2 translate-x-full rounded-full border border-transparent shadow ring-1 transition-transform duration-500 ease-in-out"
                            />
                            <button
                                onClick={() => setTerm('onDemand')}
                                {...(term === 'onDemand' && { 'data-active': true })}
                                className="data-active:text-foreground data-active:font-medium relative">
                                On-demand
                            </button>
                            <button
                                onClick={() => setTerm('reserved')}
                                {...(term === 'reserved' && { 'data-active': true })}
                                className="data-active:text-foreground data-active:font-medium relative">
                                Reserved
                            </button>
                        </div>
                        <div className="mt-3 text-center text-xs">
                            <span className="text-primary font-medium">Save up to 60%</span> on 36-month reserved capacity
                        </div>
                    </div>
                </div>
                <div className="@container">
                    <div className="@4xl:max-w-full mx-auto max-w-sm rounded-xl border">
                        <div className="@4xl:grid-cols-3 grid *:p-8">
                            <div className="@max-4xl:p-9 row-span-4 grid grid-rows-subgrid gap-8">
                                <div className="self-end">
                                    <CardTitle className="text-lg font-medium">Volt Spark</CardTitle>
                                    <div className="text-muted-foreground mt-1 text-balance text-sm">Tokens-as-a-service. OpenAI-compatible. Llama 70B standard rate.</div>
                                </div>

                                <div>
                                    <NumberFlow
                                        value={0.95}
                                        format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
                                        suffix="/M"
                                        className="text-3xl font-semibold"
                                    />
                                    <div className="text-muted-foreground text-sm">{note.spark}</div>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full">
                                    <Link href="/contact">Get started</Link>
                                </Button>

                                <ul
                                    role="list"
                                    className="space-y-3 text-sm">
                                    {['OpenAI drop-in: change base URL + key', 'Zero egress, in-metro serving', 'Sovereign tier: pod-pinned + attestation ($1.45/M)'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2">
                                            <Check
                                                className="text-primary size-3"
                                                strokeWidth={3.5}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="ring-border bg-card rounded-(--radius) @4xl:my-2 @max-4xl:mx-1 shadow-black/6.5 row-span-4 grid grid-rows-subgrid gap-8 shadow-xl ring-1 backdrop-blur">
                                <div className="self-end">
                                    <CardTitle className="text-lg font-medium">Volt Forge</CardTitle>
                                    <CardDescription className="text-muted-foreground mt-1 text-balance text-sm">GPU-as-a-service. Dedicated leases in your namespace.</CardDescription>
                                </div>

                                <div>
                                    <NumberFlow
                                        value={prices.forge[term]}
                                        format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2 }}
                                        suffix="/GPU/hr"
                                        className="text-3xl font-semibold"
                                    />
                                    <div className="text-muted-foreground text-sm">{note.forge}</div>
                                </div>
                                <Button
                                    asChild
                                    className="w-full">
                                    <Link href="/contact">Get started</Link>
                                </Button>

                                <ul
                                    role="list"
                                    className="space-y-3 text-sm">
                                    {['Everything in Spark plus:', 'NVIDIA B200 + L40S capacity', 'Scoped kubeconfig into a dedicated namespace', 'Reserved: 45% off at 12-mo, 60% off at 36-mo', '31% below CoreWeave list', '99.9% uptime SLA (Tier III)'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="group flex items-center gap-2 first:font-medium">
                                            <Check
                                                className="text-primary size-3 group-first:hidden"
                                                strokeWidth={3.5}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="@max-4xl:p-9 row-span-4 grid grid-rows-subgrid gap-8">
                                <div className="self-end">
                                    <CardTitle className="text-lg font-medium">Volt Vault</CardTitle>
                                    <CardDescription className="text-muted-foreground mt-1 text-balance text-sm">Dedicated bare-metal. Sovereign by default.</CardDescription>
                                </div>

                                <div>
                                    <NumberFlow
                                        value={prices.vault[term]}
                                        format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
                                        suffix="/mo"
                                        className="text-3xl font-semibold"
                                    />
                                    <div className="text-muted-foreground text-sm">{note.vault}</div>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full">
                                    <Link href="/contact">Get started</Link>
                                </Button>

                                <ul
                                    role="list"
                                    className="space-y-3 text-sm">
                                    {['Everything in Forge plus:', 'Single-tenant bare-metal racks', 'Measured-boot attestation per node', 'SPIFFE federation into your trust domain', 'Zero ingress, egress, and inter-pod transfer', '8-GPU B200 rack, 36-mo'].map((item, index) => (
                                        <li
                                            key={index}
                                            className="group flex items-center gap-2 first:font-medium">
                                            <Check
                                                className="text-primary size-3 group-first:hidden"
                                                strokeWidth={3.5}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
