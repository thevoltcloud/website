import { Quote } from 'lucide-react'
import Image from 'next/image'

const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'

export default function TestimonialsSection() {
    return (
        <section className="bg-background py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="mx-auto max-w-2xl">
                    <Quote
                        aria-hidden
                        className="fill-illustration dark:stroke-muted-foreground stroke-illustration dark:fill-muted-foreground size-6 drop-shadow-md"
                    />
                    <div className="mt-12">
                        <p className='md:text-3xl/9.5 text-xl font-medium before:mr-1 before:content-["\201C"] after:ml-1 after:content-["\201D"]'>Data residency you can prove beats data residency you promise. Zero egress is structural, not contractual &mdash; data never leaves the metro, and every request is bound to a tenant identity in an immutable audit log.</p>

                        <div className="mt-12 flex items-center gap-3">
                            <div className="ring-foreground/10 aspect-square size-10 overflow-hidden rounded-full border border-transparent shadow-md shadow-black/15 ring-1">
                                <Image
                                    src={MESCHAC_AVATAR}
                                    alt="Volt logo"
                                    width={120}
                                    height={120}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="space-y-px">
                                <p className="text-sm font-medium">Volt</p>
                                <p className="text-muted-foreground text-xs">Platform thesis &mdash; Sovereign Inference Cloud</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}