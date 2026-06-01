import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Contact() {
    return (
        <section className="bg-background py-24">
            <div className="@container mx-auto max-w-5xl px-2">
                <div className="mx-auto max-w-4xl">
                    <div className="mx-auto max-w-2xl px-6">
                        <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:tracking-tight">Request access</h1>
                        <p className="text-muted-foreground mt-4 text-balance text-lg">Design-partner slots are open. Tell us about your workload and we&apos;ll route you to the right pod.</p>
                    </div>

                    <div className="@lg:grid-cols-2 @lg:gap-y-12 mx-auto mt-10 grid max-w-2xl gap-3">
                        <div className="flex flex-col rounded-xl border p-6">
                            <h2 className="font-medium">Talk to the team</h2>
                            <p className="text-muted-foreground mb-4 mt-2 text-balance">Walk through Spark, Forge, and Vault pricing and find the right tier for your metro.</p>
                            <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="mt-auto w-fit">
                                <Link href="/contact">Talk to the team</Link>
                            </Button>
                        </div>
                        <div className="flex flex-col rounded-xl border p-6">
                            <h2 className="text-lg font-medium">Docs and support</h2>
                            <p className="text-muted-foreground mb-4 mt-2 text-balance">API references, SDK guides, and deployment docs for running open-weights models in-metro.</p>

                            <div className="mt-auto flex flex-wrap gap-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="w-fit">
                                    <Link href="https://docs.voltcloud.ai">Read the docs</Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-primary w-fit">
                                    <Link href="mailto:hello@voltcloud.ai">hello@voltcloud.ai</Link>
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col p-6">
                            <h2 className="text-muted-foreground mb-2 text-sm">General</h2>
                            <Link
                                href="mailto:hello@voltcloud.ai"
                                className="hover:decoration-primary font-medium hover:underline">
                                hello@voltcloud.ai
                            </Link>
                        </div>
                        <div className="flex flex-col p-6">
                            <h2 className="text-muted-foreground mb-2 text-sm">Security</h2>
                            <Link
                                href="mailto:security@voltcloud.ai"
                                className="hover:decoration-primary font-medium hover:underline">
                                security@voltcloud.ai
                            </Link>
                        </div>

                        <div className="flex flex-col p-6">
                            <h2 className="text-muted-foreground mb-2 text-sm">Status</h2>
                            <Link
                                href="https://status.voltcloud.ai"
                                className="hover:decoration-primary font-medium hover:underline">
                                status.voltcloud.ai
                            </Link>
                        </div>
                        <div className="flex flex-col p-6">
                            <h2 className="text-muted-foreground mb-2 text-sm">GitHub</h2>
                            <Link
                                href="https://github.com/thevoltcloud"
                                className="hover:decoration-primary font-medium hover:underline">
                                @thevoltcloud
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}