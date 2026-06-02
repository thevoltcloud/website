import React from 'react'
import Link from 'next/link'
import { SITE } from '@/lib/site'
import { LeadForm } from '@/components/lead-form'

const channels = [
    { label: 'General', value: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
    { label: 'Security', value: SITE.securityEmail, href: `mailto:${SITE.securityEmail}` },
    { label: 'Docs', value: 'Read the docs', href: SITE.docsUrl },
    { label: 'Status', value: 'View status page', href: SITE.statusUrl },
    { label: 'GitHub', value: '@thevoltcloud', href: 'https://github.com/thevoltcloud' },
]

export default function Contact() {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="max-w-2xl">
                    <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:tracking-tight">Request access</h1>
                    <p className="text-muted-foreground mt-4 text-balance text-lg">
                        Design-partner slots are open. Tell us about your workload and we&apos;ll route you to the right
                        pod.
                    </p>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                    <LeadForm />

                    <div className="space-y-6">
                        <p className="text-muted-foreground text-sm">
                            Prefer email? Reach us directly — we read every message.
                        </p>
                        <dl className="divide-border divide-y">
                            {channels.map((c) => (
                                <div key={c.label} className="flex items-center justify-between gap-4 py-3">
                                    <dt className="text-muted-foreground text-sm">{c.label}</dt>
                                    <dd>
                                        <Link href={c.href} className="hover:decoration-primary text-sm font-medium hover:underline">
                                            {c.value}
                                        </Link>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    )
}