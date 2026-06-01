import { LogoIcon } from '@/components/logo'

export default function ContentSection() {
    return (
        <section className="bg-background py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="bg-card ring-foreground/5 relative mx-auto max-w-2xl rounded-3xl border border-transparent p-8 shadow ring-1 sm:p-12 sm:pb-10">
                    <div>
                        <div className="text-muted-foreground space-y-4 text-lg *:leading-relaxed">
                            <p>
                                Sovereign inference starts with a structural fact: data <strong className="text-foreground font-medium">cannot leave the pod</strong>. Volt enforces <strong className="text-foreground font-medium">zero ingress, zero egress, and zero inter-pod transfer</strong>. Your prompts and outputs are served in your customer&apos;s metro and stay there. Residency is a property of the architecture, not a clause in a contract.
                            </p>
                            <p>
                                Every workload carries a cryptographic identity. <strong className="text-foreground font-medium">SPIRE</strong> issues short-lived <strong className="text-foreground font-medium">SPIFFE SVIDs</strong> to each service, so calls between the gateway, scheduler, and inference runtime are authenticated by identity rather than by network location. No shared secrets, no long-lived credentials.
                            </p>
                            <p>
                                The network is closed by default. <strong className="text-foreground font-medium">Cilium</strong> applies <strong className="text-foreground font-medium">default-deny egress at L3/L4</strong>, so a pod can only reach the endpoints its policy names. There is no path off the box for data to take, even if a workload tried to open one.
                            </p>
                            <p>
                                On Volt Vault, hardware proves its own state. <strong className="text-foreground font-medium">Measured-boot attestation</strong> verifies firmware, kernel, and runtime per node before a workload is scheduled. A node that fails attestation never receives a request.
                            </p>
                            <p>
                                The supply chain is verifiable end to end. Images are <strong className="text-foreground font-medium">cosign-signed</strong> with <strong className="text-foreground font-medium">SLSA L3 provenance</strong>, so every running container traces back to a known build. And <strong className="text-foreground font-medium">audit is on by default</strong>: every request is bound to a tenant identity and written to an immutable log.
                            </p>
                        </div>

                        <div className="mt-10 flex items-center gap-3 border-t pt-6">
                            <div className="bg-primary/10 ring-foreground/10 flex aspect-square size-12 items-center justify-center rounded-xl border border-transparent shadow-md shadow-black/15 ring-1">
                                <LogoIcon
                                    uniColor
                                    aria-hidden
                                    className="text-primary size-6"
                                />
                            </div>
                            <div className="space-y-0.5 text-base *:block">
                                <span className="text-foreground font-medium">Volt Security</span>
                                <span className="text-muted-foreground text-sm">Sovereign Inference Cloud</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
