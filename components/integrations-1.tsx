import { Card } from '@/components/ui/card'
import Link from 'next/link'
import * as React from 'react'
import { SITE } from '@/lib/site'
import { Plug2, Boxes, Gauge, Workflow, Fingerprint, Network, FileCode2, Terminal } from 'lucide-react'

export default function IntegrationsSection() {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-semibold lg:text-4xl">Built on the tools your team already runs</h2>
                    <p className="text-muted-foreground mt-4 text-balance">Open standards end to end — OpenAI-compatible APIs, Kubernetes, and the CNCF stack. No proprietary lock-in.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <IntegrationCard
                        title="OpenAI-compatible API"
                        description="Spark is a drop-in OpenAI endpoint. Change the base URL and key — your existing SDK calls just work."
                        link={SITE.docsUrl}>
                        <Plug2 className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Kubernetes"
                        description="Kubernetes-native by design. Forge leases land as scoped kubeconfigs into a dedicated namespace."
                        link={SITE.docsUrl}>
                        <Boxes className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="vLLM"
                        description="vLLM-direct serving at the data plane for high-throughput open-weights inference, with llm-d as the stack hardens."
                        link={SITE.docsUrl}>
                        <Gauge className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="KServe"
                        description="CNCF KServe drives model lifecycle and autoscaling across every pod. Contributed back upstream."
                        link={SITE.docsUrl}>
                        <Workflow className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="SPIRE / SPIFFE"
                        description="Workload identity via SPIRE-issued SVIDs. Federate Vault nodes into your own trust domain."
                        link="/security">
                        <Fingerprint className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Cilium"
                        description="Cilium enforces default-deny egress at L3/L4. Data residency is structural, not contractual."
                        link="/security">
                        <Network className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="Terraform"
                        description="Provision pods, namespaces, and leases as code. Reproducible, auditable infrastructure across metros."
                        link={SITE.docsUrl}>
                        <FileCode2 className="text-primary" />
                    </IntegrationCard>

                    <IntegrationCard
                        title="voltctl CLI"
                        description="Manage tenants, models, and reserved capacity from the command line. Scriptable and CI-friendly."
                        link={SITE.docsUrl}>
                        <Terminal className="text-primary" />
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
