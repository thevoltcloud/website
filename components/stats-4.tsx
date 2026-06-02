import { cn } from '@/lib/utils'

const stats = [
    { value: '25+', label: 'Metro pods' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '$0.95/M', label: 'Llama 70B tokens' },
    { value: '$0', label: 'Egress fees, ever' },
]

export default function StatsSection() {
    return (
        <section className="bg-background @container py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <h2 className="mx-auto max-w-2xl text-balance text-center text-3xl font-semibold lg:text-4xl">Sovereign inference, by the numbers</h2>
                <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-pretty text-center text-lg">
                    Frontier open-weights LLMs in your customer&apos;s metro, with <strong className="text-foreground font-semibold">zero egress and Bedrock-beating prices</strong> across every pod.
                </p>

                <div className="relative mt-12">
                    <PlusDecorator className="-translate-[calc(50%-0.5px)]" />
                    <PlusDecorator className="right-0 -translate-y-[calc(50%-0.5px)] translate-x-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />

                    <div className="**:text-center bg-card *:hover:bg-foreground/2 @xl:grid-cols-4 @xl:divide-y-0 grid grid-cols-2 divide-x divide-y border *:p-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="space-y-2">
                                <div className="bg-linear-to-t from-foreground to-muted-foreground bg-clip-text text-3xl font-medium text-transparent md:text-5xl">{stat.value}</div>
                                <p className="text-muted-foreground text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const PlusDecorator = ({ className }: { className?: string }) => (
    <div
        aria-hidden
        className={cn('mask-radial-from-15% before:bg-foreground/25 after:bg-foreground/25 absolute size-3 before:absolute before:inset-0 before:m-auto before:h-px after:absolute after:inset-0 after:m-auto after:w-px', className)}
    />
)