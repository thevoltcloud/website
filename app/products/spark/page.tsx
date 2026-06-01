import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import CallToAction from '@/components/call-to-action'
import { Check, Plug, ShieldCheck, MapPin } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Volt Spark',
    description: 'Tokens-as-a-service. OpenAI-compatible.',
}

const features = [
    {
        icon: Plug,
        title: 'OpenAI drop-in',
        description: 'Change the base URL and key. Your existing SDK code keeps working.',
    },
    {
        icon: MapPin,
        title: 'Zero egress, in-metro serving',
        description: 'Tokens are served in your customer’s metro. Data never leaves the city.',
    },
    {
        icon: ShieldCheck,
        title: 'Sovereign tier',
        description: 'Pod-pinned inference with attestation. $1.45/M, about 45% below AWS Bedrock.',
    },
]

const codeSample = `from openai import OpenAI

client = OpenAI(
    base_url="https://api.volt.cloud/v1",
    api_key="volt-...",
)

resp = client.chat.completions.create(
    model="llama-3.3-70b",
    messages=[{"role": "user", "content": "Hello, Volt."}],
)

print(resp.choices[0].message.content)`

export default function SparkPage() {
    return (
        <main>
            <section className="pt-32 pb-16 md:pb-24">
                <div className="mx-auto max-w-5xl px-6">
                    <span className="text-primary text-sm font-medium">Volt Spark</span>
                    <h1 className="mt-4 text-balance text-4xl font-semibold md:text-5xl">
                        Tokens-as-a-service, OpenAI-compatible
                    </h1>
                    <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
                        Frontier open-weights LLMs in production, served in your customer&apos;s metro.
                        Bedrock-beating prices with zero egress.
                    </p>
                    <div className="mt-8 flex items-baseline gap-2">
                        <span className="text-4xl font-semibold">$0.95</span>
                        <span className="text-muted-foreground">/M tokens, Llama 70B standard</span>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild size="lg">
                            <Link href="/contact">Request access</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="https://docs.volt.cloud">Docs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="pb-16 md:pb-24">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <Card key={feature.title}>
                                    <CardHeader>
                                        <Icon className="text-primary size-6" />
                                        <CardTitle className="mt-4">{feature.title}</CardTitle>
                                        <CardDescription>{feature.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="pb-16 md:pb-24">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-2xl font-semibold md:text-3xl">Drop-in compatible</h2>
                    <p className="text-muted-foreground mt-3 max-w-2xl">
                        Point the OpenAI SDK at Volt. No rewrite, no new client library.
                    </p>
                    <Card className="mt-8 overflow-hidden">
                        <CardContent className="p-0">
                            <pre className="overflow-x-auto p-6 text-sm">
                                <code>{codeSample}</code>
                            </pre>
                        </CardContent>
                    </Card>
                    <ul className="mt-8 space-y-3">
                        <li className="flex items-start gap-3">
                            <Check className="text-primary mt-0.5 size-5 shrink-0" />
                            <span>Standard catalog: Llama 3.3/4, Mistral, Gemma 3, Phi-4, and more.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="text-primary mt-0.5 size-5 shrink-0" />
                            <span>Bring your own LoRA or full-weights fine-tunes.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="text-primary mt-0.5 size-5 shrink-0" />
                            <span>99.9% uptime SLA with credits at 99.0% and 98.0% breach.</span>
                        </li>
                    </ul>
                </div>
            </section>

            <CallToAction />
        </main>
    )
}
