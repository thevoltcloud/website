'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function InvestorLogout() {
    const router = useRouter()

    async function logout() {
        await fetch('/api/investors/auth', { method: 'DELETE' })
        router.replace('/investors/login')
        router.refresh()
    }

    return (
        <button
            onClick={logout}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors">
            <LogOut className="size-3.5" />
            Sign out
        </button>
    )
}
