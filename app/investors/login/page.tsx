'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { LogoIcon } from '@/components/logo'
import { Lock } from 'lucide-react'

function LoginForm() {
    const router = useRouter()
    const params = useSearchParams()
    const from = params.get('from') || '/investors'

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const res = await fetch('/api/investors/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })
            if (res.ok) {
                router.replace(from)
                router.refresh()
            } else {
                const data = await res.json().catch(() => ({}))
                setError(data.error || 'Incorrect access code.')
                setLoading(false)
            }
        } catch {
            setError('Something went wrong. Try again.')
            setLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-sm p-8">
            <div className="flex flex-col items-center text-center">
                <span className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                    <LogoIcon uniColor className="text-primary size-6" />
                </span>
                <h1 className="mt-4 text-xl font-semibold">Volt Investor Room</h1>
                <p className="text-muted-foreground mt-2 text-balance text-sm">
                    Confidential. Enter the access code from your invitation to continue.
                </p>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="password">Access code</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••"
                        required
                    />
                </div>
                {error && <p className="text-destructive text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading || !password}>
                    {loading ? 'Verifying…' : 'Enter'}
                </Button>
            </form>

            <p className="text-muted-foreground mt-6 flex items-center justify-center gap-1.5 text-xs">
                <Lock className="size-3" />
                Need access? Email{' '}
                <a href="mailto:angel@cuemby.com" className="text-primary hover:underline">
                    angel@cuemby.com
                </a>
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
