import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { COOKIE_NAME, sha256hex, isAdminEmail } from '@/lib/investor-auth'
import { resolveSession, getInvestor } from '@/lib/investor-store'
import { AdminConsole } from '@/components/investor-admin'

export const metadata: Metadata = {
    title: 'Investor Room — Admin',
    robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function InvestorAdminPage() {
    // Middleware guarantees a live session; here we enforce the admin role.
    const raw = (await cookies()).get(COOKIE_NAME)?.value
    const email = raw ? await resolveSession(await sha256hex(raw)) : null
    const ok = email && (isAdminEmail(email) || Boolean((await getInvestor(email))?.is_admin))
    if (!ok) redirect('/investors')

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Investor Room — Admin</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Approve access, revoke it, and see who&apos;s in the data room.</p>
                    </div>
                    <Link href="/investors" className="text-muted-foreground hover:text-primary text-sm">
                        ← Back to room
                    </Link>
                </div>
                <div className="mt-10">
                    <AdminConsole />
                </div>
            </div>
        </div>
    )
}
