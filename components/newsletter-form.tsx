'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function NewsletterForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('submitting')
        const data = new FormData(e.currentTarget)
        const payload = {
            kind: 'newsletter',
            email: String(data.get('email') || ''),
            company_website: String(data.get('company_website') || ''), // honeypot
        }
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            setStatus(res.ok ? 'success' : 'error')
            if (res.ok) e.currentTarget.reset()
        } catch {
            setStatus('error')
        }
    }

    return (
        <form onSubmit={onSubmit} className="ml-auto w-full space-y-4 md:max-w-xs">
            <Label className="block text-sm font-medium" htmlFor="newsletter-email">
                Subscribe to our newsletter
            </Label>
            <div className="flex gap-2">
                <Input
                    className="bg-background ring-foreground/10 h-8 border-transparent shadow ring-1"
                    placeholder="Your email"
                    type="email"
                    id="newsletter-email"
                    required
                    name="email"
                    disabled={status === 'success'}
                />
                <div aria-hidden className="hidden">
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                </div>
                <Button type="submit" size="sm" disabled={status === 'submitting' || status === 'success'}>
                    <span>{status === 'success' ? 'Subscribed' : status === 'submitting' ? '…' : 'Subscribe'}</span>
                </Button>
            </div>
            <p className="text-muted-foreground text-xs">
                {status === 'success'
                    ? 'You’re on the list. Watch your inbox.'
                    : status === 'error'
                      ? 'Something went wrong — please try again.'
                      : 'Get the latest product news and behind the scenes updates. Unsubscribe at any time.'}
            </p>
        </form>
    )
}
