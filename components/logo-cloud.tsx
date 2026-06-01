import { cn } from '@/lib/utils'

export default function LogoCloud() {
    const logos = [
        { alt: 'NVIDIA', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'AMD', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Intel', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'CNCF', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Kubernetes', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'vLLM', className: 'text-sm font-semibold tracking-tight' },

        { alt: 'KServe', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Cilium', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Summit HQ', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Supermicro', className: 'text-sm font-semibold tracking-tight' },
        { alt: 'Arista', className: 'text-sm font-semibold tracking-tight' },
    ]
    return (
        <section className="bg-background py-16">
            <div className="mx-auto max-w-5xl px-6">
                <h2 className="text-muted-foreground mb-8 text-center text-sm font-medium">
                    Built on the CNCF cloud-native AI stack
                </h2>
                <div className="relative">
                    <PlusDecorator className="-translate-[calc(50%-0.5px)]" />
                    <PlusDecorator className="right-0 -translate-y-[calc(50%-0.5px)] translate-x-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 right-0 translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />
                    <PlusDecorator className="bottom-0 -translate-x-[calc(50%-0.5px)] translate-y-[calc(50%-0.5px)]" />

                    <div className="lg:*:nth-5:border-r-0 lg:*:nth-[n+6]:nth-[-n+9]:border-b-0 grid grid-cols-3 divide-x divide-y border md:grid-cols-4 lg:grid-cols-5">
                        {logos.map((logo) => (
                            <div
                                key={logo.alt}
                                className="hover:bg-foreground/5 flex items-center justify-center px-4 py-6 lg:py-7">
                                <span className={`${logo.className} text-foreground/80 w-fit`}>{logo.alt}</span>
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