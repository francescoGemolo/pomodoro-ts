import { HugeiconsIcon } from '@hugeicons/react'
import { StudyLampIcon, CoffeeIcon, Flower2Icon, PlayIcon } from '@hugeicons/core-free-icons'

interface PageHeaderProps {
    statusLabel: string
    phase: string
}

export default function PageHeader({ statusLabel, phase }: PageHeaderProps) {
    const getStatusIcon = () => {
        if (phase === 'focus') return StudyLampIcon
        if (phase === 'short-break' || phase === 'long-break') return CoffeeIcon
        if (phase === 'paused') return PlayIcon
        return Flower2Icon
    }

    return (
        <header className="page-header">
            <hgroup>
                <h1>Ludi's Focus</h1>
                <p>Made by Francesco with love!</p>
            </hgroup>
            <p className={`status-badge state-${phase}`}>
                <HugeiconsIcon icon={getStatusIcon()} size={16} strokeWidth={2} />
                <span>{statusLabel}</span>
            </p>
        </header>
    )
}