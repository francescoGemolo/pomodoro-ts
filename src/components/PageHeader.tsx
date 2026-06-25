import { HugeiconsIcon } from '@hugeicons/react'
import { HeartIcon, StudyLampIcon } from '@hugeicons/core-free-icons'

interface PageHeaderProps {
    statusLabel: string
}

export default function PageHeader({ statusLabel }: PageHeaderProps) {
    return (
        <header className="page-header">
            <hgroup>
                <h1>
                    Ludi's Focus
                    <HugeiconsIcon icon={HeartIcon} size={22} strokeWidth={2} />
                </h1>
                <p>A clean block is waiting for you.</p>
            </hgroup>
            <p className="status-badge">
                <HugeiconsIcon icon={StudyLampIcon} size={16} strokeWidth={2} />
                <span>{statusLabel}</span>
            </p>
        </header>
    )
}