import { cn } from '@/lib/utils'
import Image from 'next/image'

type Member = {
    name: string
    position: string
    image: string
    decoratorColors: string
}

const members: Member[] = [
    {
        name: 'Angel Ramirez',
        position: 'CEO · CNCF Ambassador, founder of Cuemby',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        decoratorColors: 'from-purple-400 via-blue-400 to-amber-500',
    },
    {
        name: 'Cristher Castro',
        position: 'CCO · Talent, financial discipline, international ops',
        image: 'https://images.unsplash.com/photo-1629559915090-ee09fc9787c1?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        decoratorColors: 'from-purple-400 via-sky-400 to-emerald-500',
    },
    {
        name: 'Hitomi Mizugaki',
        position: 'CPO · Product, agile, customer growth',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        decoratorColors: 'from-teal-400 via-cyan-400 to-blue-500',
    },
]

export default function TeamSection() {
    return (
        <section className="bg-background py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div>
                    <h2 className="text-foreground max-w-xs text-balance text-4xl font-semibold">The team behind Volt</h2>

                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="bg-card shadow-black/3 ring-border shadow-black/6.5 rounded-3xl p-2 shadow-xl ring-1">
                                <div className="before:border-foreground/10 before:z-1 relative aspect-square overflow-hidden rounded-2xl before:absolute before:inset-0 before:rounded-2xl before:border">
                                    <div
                                        aria-hidden
                                        className={cn('bg-linear-to-r z-1 opacity-6.5 pointer-events-none absolute inset-0 size-40 rounded-full mix-blend-overlay blur-2xl will-change-transform md:size-72', member.decoratorColors)}
                                    />
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={320}
                                        height={540}
                                        className="size-full object-cover object-top grayscale"
                                    />
                                </div>
                                <div className="space-y-0.5 px-3 pb-2 pt-3">
                                    <p className="text-foreground font-medium">{member.name}</p>
                                    <p className="text-muted-foreground text-sm">{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 border-t pt-8">
                        <p className="text-foreground font-medium">Backed by operators</p>
                        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
                            Advised by Nick Lashinsky, Jim Chappell, and James Leaverton. The founding team has completed 120+ tech due-diligence engagements.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}