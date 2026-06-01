import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

const faqItems = [
    {
        group: 'Platform',
        items: [
            {
                id: 'item-1',
                question: 'What does zero egress mean?',
                answer: 'Your data never leaves the metro pod where it is served. Cilium enforces default-deny egress at L3/L4, so data residency is structural, not contractual. Zero ingress, zero egress, zero inter-pod transfer across every SKU.',
            },
            {
                id: 'item-2',
                question: 'Is it OpenAI-compatible?',
                answer: 'Yes. Volt Spark is a drop-in for the OpenAI API. Change the base URL and key and your existing client code works unchanged. No SDK rewrite, no proxy gymnastics.',
            },
            {
                id: 'item-3',
                question: 'How fast can a pod deploy?',
                answer: 'Turnkey modular pods deploy in 90 days through our site and container partners. Once a pod is live, dedicated Forge leases and Vault racks provision into your namespace or trust domain in days, not quarters.',
            },
        ],
    },
    {
        group: 'Models & Pricing',
        items: [
            {
                id: 'item-1',
                question: 'Which models can I run?',
                answer: 'The Standard catalog of Western-origin open-weights models is the default for every customer (Llama, Mistral, Gemma, Phi, and more). The Extended catalog is opt-in and blocked by default for federal and regulated workloads. Bring-your-own fine-tunes are always supported, whether LoRA adapters or full weights.',
            },
            {
                id: 'item-2',
                question: 'How does pricing compare to Bedrock?',
                answer: 'Volt Spark serves Llama 70B at $0.95/M tokens standard and $1.45/M on the sovereign tier. The sovereign tier runs about 45% below AWS Bedrock at $2.65/M for the same model, with in-metro serving and zero egress included.',
            },
            {
                id: 'item-3',
                question: 'What is the sovereign tier?',
                answer: 'The sovereign tier pins inference to a specific pod with cryptographic attestation. You get pod-pinned serving, measured-boot guarantees, and an immutable audit trail mapping every request to a tenant identity. Built for FedRAMP-path and EU AI Act workloads where data must stay in region.',
            },
        ],
    },
    {
        group: 'Reliability',
        items: [
            {
                id: 'item-1',
                question: 'What is the SLA?',
                answer: 'Volt runs a 99.9% uptime SLA on Tier III infrastructure. Service credits apply at the 99.0% and 98.0% breach thresholds. Live status is published at status.volt.cloud.',
            },
        ],
    },
]

export default function FAQs() {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="mx-auto max-w-3xl px-1 md:px-6">
                <div className="max-w-lg max-md:px-6">
                    <h2 className="text-foreground text-4xl font-semibold">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance text-lg">Answers on zero egress, model catalog, pricing, and the sovereign tier behind Volt&apos;s inference cloud.</p>
                </div>

                <div className="my-12 space-y-12 md:-ml-6">
                    {faqItems.map((item) => (
                        <div
                            className="space-y-4"
                            key={item.group}>
                            <h3 className="text-foreground pl-6 text-lg font-semibold">{item.group}</h3>
                            <Accordion
                                type="single"
                                collapsible
                                className="-space-y-1">
                                {item.items.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        value={item.id}
                                        className="data-[state=open]:bg-card data-[state=open]:ring-border data-[state=open]:shadow-black/6.5 peer rounded-xl border-none px-6 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm data-[state=open]:ring-1">
                                        <AccordionTrigger className="cursor-pointer rounded-none border-b text-base transition-none hover:no-underline data-[state=open]:border-transparent">{item.question}</AccordionTrigger>
                                        <AccordionContent>
                                            <p className="text-muted-foreground text-base">{item.answer}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                <p className="text-muted-foreground max-md:px-6">
                    Can&apos;t find what you&apos;re looking for? Reach our{' '}
                    <Link
                        href="/contact"
                        className="text-primary font-medium hover:underline">
                        team
                    </Link>
                </p>
            </div>
        </section>
    )
}