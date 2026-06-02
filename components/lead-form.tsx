'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2 } from 'lucide-react'
import { SITE } from '@/lib/site'

const fieldClass =
    'bg-card ring-foreground/10 placeholder:text-muted-foreground/75 flex w-full min-w-0 rounded-md border border-transparent px-3 py-2 text-base shadow-sm outline-none ring-1 transition-[color,box-shadow] focus-visible:border-foreground/35 focus-visible:ring-ring/25 focus-visible:ring-[3px] md:text-sm'

export function LeadForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [error, setError] = useState('')

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('submitting')
        setError('')

        const form = e.currentTarget
        const data = new FormData(form)
        const payload = {
            kind: 'contact',
            name: String(data.get('name') || ''),
            email: String(data.get('email') || ''),
            company: String(data.get('company') || ''),
            interest: String(data.get('interest') || ''),
            message: String(data.get('message') || ''),
            company_website: String(data.get('company_website') || ''), // honeypot
        }

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (res.ok) {
                setStatus('success')
                form.reset()
            } else {
                const d = await res.json().catch(() => ({}))
                setError(d.error || 'Something went wrong. Please try again.')
                setStatus('error')
            }
        } catch {
            setError(`Network error. Please try again or email ${SITE.contactEmail}.`)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-card/50 ring-border flex flex-col items-start gap-3 rounded-xl border border-transparent p-6 ring-1">
                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                    <CheckCircle2 className="size-5" />
                </span>
                <h3 className="text-lg font-semibold">Thanks — we&apos;ve got it.</h3>
                <p className="text-muted-foreground text-sm">
                    We&apos;ll route you to the right pod and follow up shortly. For anything urgent, email{' '}
                    <a href={`mailto:${SITE.contactEmail}`} className="text-primary hover:underline">
                        {SITE.contactEmail}
                    </a>
                    .
                </p>
                <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
                    Send another
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="bg-card/50 ring-border space-y-4 rounded-xl border border-transparent p-6 ring-1">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" autoComplete="name" placeholder="Ada Lovelace" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" autoComplete="organization" placeholder="Acme, Inc." />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="interest">Interested in</Label>
                    <select id="interest" name="interest" defaultValue="" className={fieldClass}>
                        <option value="">Not sure yet</option>
                        <option value="Volt Spark">Volt Spark — tokens</option>
                        <option value="Volt Forge">Volt Forge — GPU leases</option>
                        <option value="Volt Vault">Volt Vault — bare-metal</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Your workload</Label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Models, expected volume, target metro, and any sovereignty requirements."
                    className={fieldClass}
                />
            </div>

            {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
            <div aria-hidden className="hidden">
                <label htmlFor="company_website">Company website</label>
                <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            {status === 'error' && <p className="text-destructive text-sm">{error}</p>}

            <Button type="submit" disabled={status === 'submitting'} className="w-full sm:w-auto">
                {status === 'submitting' ? 'Sending…' : 'Request access'}
            </Button>
        </form>
    )
}
