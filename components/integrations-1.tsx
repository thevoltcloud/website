import { Card } from '@/components/ui/card'
import Link from 'next/link'
import * as React from 'react'
import { VSCodium } from '@/components/ui/svgs/vs-codium'
import { Replit } from '@/components/ui/svgs/replit'
import { GooglePaLM } from '@/components/ui/svgs/google-palm'
import { Gemini } from '@/components/ui/svgs/gemini'
import { MistralAi } from '@/components/ui/svgs/mistral-ai'
import { MediaWiki } from '@/components/ui/svgs/media-wiki'

export default function IntegrationsSection() {
    return (
        <section className="bg-background py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <IntegrationCard
                        title="OpenAI-compatible API"
                        description="Spark is a drop-in OpenAI endpoint. Change the base URL and key — your existing SDK calls just work."
                        link="https://docs.volt.cloud">
                        <Gemini />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Kubernetes"
                        description="Kubernetes-native by design. Forge leases land as scoped kubeconfigs into a dedicated namespace."
                        link="https://docs.volt.cloud">
                        <Replit />
                    </IntegrationCard>

                    <IntegrationCard
                        title="vLLM"
                        description="vLLM-direct serving at the data plane for high-throughput open-weights inference, with llm-d as the stack hardens."
                        link="https://docs.volt.cloud">
                        <MistralAi />
                    </IntegrationCard>

                    <IntegrationCard
                        title="KServe"
                        description="CNCF KServe drives model lifecycle and autoscaling across every pod. Contributed back upstream."
                        link="https://docs.volt.cloud">
                        <VSCodium />
                    </IntegrationCard>

                    <IntegrationCard
                        title="SPIRE / SPIFFE"
                        description="Workload identity via SPIRE-issued SVIDs. Federate Vault nodes into your own trust domain."
                        link="/security">
                        <MediaWiki />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Cilium"
                        description="Cilium enforces default-deny egress at L3/L4. Data residency is structural, not contractual."
                        link="/security">
                        <GooglePaLM />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Terraform"
                        description="Provision pods, namespaces, and leases as code. Reproducible, auditable infrastructure across metros."
                        link="https://docs.volt.cloud">
                        <Replit />
                    </IntegrationCard>

                    <IntegrationCard
                        title="voltctl CLI"
                        description="Manage tenants, models, and reserved capacity from the command line. Scriptable and CI-friendly."
                        link="https://docs.volt.cloud">
                        <VSCodium />
                    </IntegrationCard>
                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ title, description, children, link = 'https://github.com/thevoltcloud' }: { title: string; description: string; children: React.ReactNode; link?: string }) => {
    return (
        <Card className="relative p-6">
            <div className="*:size-8">{children}</div>

            <div className="space-y-2 pt-6">
                <h3 className="text-base font-medium">
                    <Link
                        href={link}
                        className="before:absolute before:inset-0">
                        {title}
                    </Link>
                </h3>
                <p className="text-muted-foreground line-clamp-2">{description}</p>
            </div>
        </Card>
    )
}
