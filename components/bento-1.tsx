import { CurrencyIllustration } from "@/components/ui/illustrations/currency-illustration"
import { ReplyIllustration } from "@/components/ui/illustrations/reply-illustration"
import { NotificationIllustration } from "@/components/ui/illustrations/notification-illustration"
import { Card } from '@/components/ui/card'
import { VisualizationIllustration } from "@/components/ui/illustrations/visualization-illustration"
import { PollIllustration } from "@/components/ui/illustrations/poll-illustration"

export default function BentoOne() {
    return (
        <section className="@container py-24">
            <h2 className="sr-only">Capabilities</h2>
            <div className="mx-auto w-full max-w-5xl px-6">
                <div className="not-dark:*:bg-card/50 @xl:grid-cols-2 @3xl:grid-cols-6 grid gap-3">
                    <Card className="@3xl:col-span-2 grid grid-rows-[auto_1fr] space-y-8 overflow-hidden rounded-2xl p-8">
                        <div>
                            <h3 className="text-foreground font-semibold">Zero Egress</h3>
                            <p className="text-muted-foreground mt-3">Data residency is structural, not contractual. Zero ingress, zero egress, zero inter-pod transfer across every SKU.</p>
                        </div>
                        <div className="bg-linear-to-b relative -m-8 flex items-end p-8">
                            <Stripes />
                            <NotificationIllustration variant="mixed" />
                        </div>
                    </Card>
                    <Card className="@3xl:col-span-2 grid grid-rows-[auto_1fr] space-y-8 overflow-hidden rounded-2xl p-8">
                        <div>
                            <h3 className="text-foreground font-semibold">Cryptographic Attestation</h3>
                            <p className="text-muted-foreground mt-3">Measured-boot attestation per node and SPIFFE workload identity. Prove where your inference ran, signed end to end.</p>
                        </div>
                        <div className="bg-linear-to-b relative -m-8 flex items-end p-8">
                            <Stripes />
                            <CurrencyIllustration />
                        </div>
                    </Card>
                    <Card className="@3xl:col-span-2 grid grid-rows-[auto_1fr] gap-8 overflow-hidden rounded-2xl p-8">
                        <div>
                            <h3 className="text-foreground font-semibold">Multi-Vendor GPU</h3>
                            <p className="text-muted-foreground mt-3">NVIDIA B200 and L40S today. AMD MI355X and Intel Gaudi 3 as the stack hardens. One control plane across all of it.</p>
                        </div>
                        <div className="bg-linear-to-b relative -m-8 flex items-end p-8">
                            <Stripes />
                            <ReplyIllustration className="relative mt-0 w-full" />
                        </div>
                    </Card>
                    <Card className="@3xl:col-span-2 group grid grid-rows-[auto_1fr] gap-8 overflow-hidden rounded-2xl p-8">
                        <div>
                            <h3 className="text-foreground font-semibold">OpenAI-Compatible API</h3>
                            <p className="text-muted-foreground mt-3">A drop-in endpoint. Change the base URL and key, keep your existing SDKs and tooling unchanged.</p>
                        </div>

                        <div className="bg-linear-to-b relative -m-8 flex items-end p-8">
                            <Stripes />
                            <PollIllustration />
                        </div>
                    </Card>
                    <Card className="@xl:col-span-2 @3xl:col-span-4 grid grid-rows-[auto_1fr] gap-8 overflow-hidden rounded-2xl p-8">
                        <div>
                            <h3 className="text-foreground font-semibold">Kubernetes-Native Control Plane</h3>
                            <p className="text-muted-foreground mt-3 text-balance">CNCF-native by design: llm-d, KServe, Kueue, Cilium, and SPIRE. Scoped kubeconfig into your namespace, contributed back upstream.</p>
                        </div>
                        <VisualizationIllustration />
                    </Card>
                </div>
            </div>
        </section>
    )
}

const Stripes = () => (
    <div
        aria-hidden
        className="opacity-3 absolute -inset-x-6 inset-y-0 bg-[repeating-linear-gradient(-45deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_6px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
    />
)