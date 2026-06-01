import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <span className={cn('text-foreground flex items-center gap-2', className)}>
            <LogoIcon
                uniColor={uniColor}
                className="size-6"
            />
            <span className="text-lg font-semibold tracking-tight">Volt</span>
        </span>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            className={cn('size-5', className)}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.2 2 4 13.2a.6.6 0 0 0 .47.98H10l-1.1 7.2c-.1.66.74 1.03 1.16.5L20 10.8a.6.6 0 0 0-.47-.98H14l1.06-7.3c.1-.66-.74-1.02-1.16-.5Z"
                fill={uniColor ? 'currentColor' : 'url(#paint_logo)'}
            />
            <defs>
                <linearGradient
                    id="paint_logo"
                    x1="4"
                    y1="2"
                    x2="20"
                    y2="22"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F7D000" />
                    <stop
                        offset="1"
                        stopColor="#E63946"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}
