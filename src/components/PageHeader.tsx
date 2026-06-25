import { HugeiconsIcon } from '@hugeicons/react'
import { HeartIcon, StudyLampIcon, CoffeeIcon, AppWindowIcon, PlayIcon } from '@hugeicons/core-free-icons'

interface PageHeaderProps {
    statusLabel: string
    phase: string
}

export default function PageHeader({ statusLabel, phase }: PageHeaderProps) {
    const getStatusIcon = () => {
        if (phase === 'focus') return StudyLampIcon
        if (phase === 'short-break' || phase === 'long-break') return CoffeeIcon
        if (phase === 'paused') return PlayIcon
        return AppWindowIcon
    }

    return (
        <header className="page-header">
            <hgroup>
                <h1>
                    Ludi's Focus
                    <HugeiconsIcon icon={HeartIcon} size={22} strokeWidth={2} />
                </h1>
                <p>Made by Francesco with love!</p>
            </hgroup>
            <p className={`status-badge state-${phase}`}>
                <HugeiconsIcon icon={getStatusIcon()} size={16} strokeWidth={2} />
                <span>{statusLabel}</span>
            </p>
        </header>
    )
}