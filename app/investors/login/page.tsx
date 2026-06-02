'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { LogoIcon } from '@/components/logo'
import { Lock, MailCheck } from 'lucide-react'

function LoginForm() {
    const params = useSearchParams()
    const linkError = params.get('error')

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [firm, setFirm] = useState('')
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/investors/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, firm }),
            })
            if (res.ok) {
                setSent(true)
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.error || 'Something went wrong.')
                setLoading(false)
            }
        } catch {
            setError('Something went wrong. Try again.')
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <Card className="w-full max-w-sm p-8 text-center">
                <span className="bg-primary/10 mx-auto flex size-12 items-center justify-center rounded-full">
                    <MailCheck className="text-primary size-6" />
                </span>
                <h1 className="mt-4 text-xl font-semibold">Check your email</h1>
                <p className="text-muted-foreground mt-2 text-balance text-sm">
                    If <span className="text-foreground font-medium">{email}</span> is on our approved list, a secure
                    link is on its way. It&apos;s single-use and expires in 15 minutes.
                </p>
                <p className="text-muted-foreground mt-4 text-xs">
                    Not approved yet? We&apos;ve logged your request and will be in touch.
                </p>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-sm p-8">
            <div className="flex flex-col items-center text-center">
                <span className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                    <LogoIcon uniColor className="text-primary size-6" />
                </span>
                <h1 className="mt-4 text-xl font-semibold">Volt Investor Room</h1>
                <p className="text-muted-foreground mt-2 text-balance text-sm">
                    Confidential. Enter your email and we&apos;ll send a secure access link.
                </p>
            </div>

            {linkError && (
                <p className="bg-destructive/10 text-destructive mt-6 rounded-lg p-3 text-center text-xs">
                    That link was invalid or has expired. Enter your email to get a new one.
                </p>
            )}

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Work email</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@firm.com"
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="firm">Firm</Label>
                        <Input id="firm" value={firm} onChange={(e) => setFirm(e.target.value)} placeholder="Optional" />
                    </div>
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !email}>
                    {loading ? 'Sending…' : 'Send me a link'}
                </Button>
            </form>

            <p className="text-muted-foreground mt-6 flex items-center justify-center gap-1.5 text-xs">
                <Lock className="size-3" />
                Access is by approval. Questions? angel@cuemby.com
            </p>
        </Card>
    )
}

export default function InvestorLoginPage() {
    return (
        <section className="bg-background flex min-h-[70vh] items-center justify-center px-6 py-20">
            <Suspense fallback={null}>
                <LoginForm />
            </Suspense>
        </section>
    )
}
