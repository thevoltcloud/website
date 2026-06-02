'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

type Investor = {
    email: string
    name: string | null
    firm: string | null
    status: 'pending' | 'approved' | 'revoked'
    created_at: string
    approved_at: string | null
}
type LogRow = {
    id: number
    email: string | null
    event: string
    doc_key: string | null
    ip: string | null
    geo_country: string | null
    geo_city: string | null
    created_at: string
}

const fmt = (s: string | null) => (s ? new Date(s).toLocaleString() : '—')

export function AdminConsole() {
    const [investors, setInvestors] = useState<Investor[]>([])
    const [logs, setLogs] = useState<LogRow[]>([])
    const [loading, setLoading] = useState(true)
    const [busy, setBusy] = useState('')
    const [addEmail, setAddEmail] = useState('')
    const [addName, setAddName] = useState('')
    const [addFirm, setAddFirm] = useState('')

    const load = useCallback(async () => {
        const res = await fetch('/api/investors/admin', { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            setInvestors(data.investors ?? [])
            setLogs(data.logs ?? [])
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        load()
    }, [load])

    async function act(action: string, email: string, extra: Record<string, string> = {}) {
        setBusy(email + action)
        await fetch('/api/investors/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, email, ...extra }),
        })
        setBusy('')
        await load()
    }

    const pending = investors.filter((i) => i.status === 'pending')
    const approved = investors.filter((i) => i.status === 'approved')
    const revoked = investors.filter((i) => i.status === 'revoked')

    if (loading) return <p className="text-muted-foreground text-sm">Loading…</p>

    return (
        <div className="space-y-12">
            {/* Add / pre-approve */}
            <section>
                <h2 className="text-lg font-semibold">Pre-approve an investor</h2>
                <p className="text-muted-foreground mt-1 text-sm">Adds the email as approved and emails them a link.</p>
                <form
                    className="mt-4 flex flex-wrap items-end gap-3"
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (addEmail) act('add', addEmail.trim().toLowerCase(), { name: addName, firm: addFirm }).then(() => {
                            setAddEmail('')
                            setAddName('')
                            setAddFirm('')
                        })
                    }}>
                    <Input className="w-56" placeholder="email@firm.com" type="email" value={addEmail} onChange={(e) => setAddEmail(e.target.value)} />
                    <Input className="w-40" placeholder="Name (optional)" value={addName} onChange={(e) => setAddName(e.target.value)} />
                    <Input className="w-40" placeholder="Firm (optional)" value={addFirm} onChange={(e) => setAddFirm(e.target.value)} />
                    <Button type="submit" disabled={!addEmail}>Add + send link</Button>
                </form>
            </section>

            {/* Pending requests */}
            <section>
                <h2 className="text-lg font-semibold">Pending requests <span className="text-muted-foreground font-normal">({pending.length})</span></h2>
                {pending.length === 0 ? (
                    <p className="text-muted-foreground mt-2 text-sm">No pending requests.</p>
                ) : (
                    <div className="mt-4 space-y-2">
                        {pending.map((i) => (
                            <Card key={i.email} className="flex flex-wrap items-center justify-between gap-3 p-4">
                                <div className="text-sm">
                                    <div className="font-medium">{i.email}</div>
                                    <div className="text-muted-foreground text-xs">
                                        {[i.name, i.firm].filter(Boolean).join(' · ') || 'no details'} · requested {fmt(i.created_at)}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" disabled={busy === i.email + 'approve'} onClick={() => act('approve', i.email)}>
                                        Approve + send link
                                    </Button>
                                    <Button size="sm" variant="outline" disabled={busy === i.email + 'revoke'} onClick={() => act('revoke', i.email)}>
                                        Deny
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Approved */}
            <section>
                <h2 className="text-lg font-semibold">Approved <span className="text-muted-foreground font-normal">({approved.length})</span></h2>
                {approved.length === 0 ? (
                    <p className="text-muted-foreground mt-2 text-sm">No approved investors yet.</p>
                ) : (
                    <div className="mt-4 space-y-2">
                        {approved.map((i) => (
                            <Card key={i.email} className="flex flex-wrap items-center justify-between gap-3 p-4">
                                <div className="text-sm">
                                    <div className="font-medium">{i.email}</div>
                                    <div className="text-muted-foreground text-xs">
                                        {[i.name, i.firm].filter(Boolean).join(' · ') || 'no details'} · approved {fmt(i.approved_at)}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" disabled={busy === i.email + 'approve'} onClick={() => act('approve', i.email)}>
                                        Resend link
                                    </Button>
                                    <Button size="sm" variant="outline" disabled={busy === i.email + 'revoke'} onClick={() => act('revoke', i.email)}>
                                        Revoke
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {revoked.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold">Revoked <span className="text-muted-foreground font-normal">({revoked.length})</span></h2>
                    <div className="mt-4 space-y-2">
                        {revoked.map((i) => (
                            <Card key={i.email} className="flex flex-wrap items-center justify-between gap-3 p-4">
                                <div className="text-sm font-medium">{i.email}</div>
                                <Button size="sm" variant="outline" disabled={busy === i.email + 'approve'} onClick={() => act('approve', i.email)}>
                                    Re-approve
                                </Button>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Access log */}
            <section>
                <h2 className="text-lg font-semibold">Access log <span className="text-muted-foreground font-normal">(last {logs.length})</span></h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="text-muted-foreground">
                            <tr className="*:border-b *:py-2 *:pr-4 *:font-medium">
                                <th>When</th>
                                <th>Email</th>
                                <th>Event</th>
                                <th>Doc</th>
                                <th>Location</th>
                                <th>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((l) => (
                                <tr key={l.id} className="*:border-b *:py-2 *:pr-4">
                                    <td className="text-muted-foreground whitespace-nowrap text-xs">{fmt(l.created_at)}</td>
                                    <td>{l.email ?? '—'}</td>
                                    <td><span className="bg-muted rounded px-1.5 py-0.5 text-xs">{l.event}</span></td>
                                    <td className="text-muted-foreground text-xs">{l.doc_key ?? '—'}</td>
                                    <td className="text-muted-foreground text-xs">{[l.geo_city, l.geo_country].filter(Boolean).join(', ') || '—'}</td>
                                    <td className="text-muted-foreground text-xs">{l.ip ?? '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
