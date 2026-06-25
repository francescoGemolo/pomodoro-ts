import { HugeiconsIcon } from '@hugeicons/react'
import { ChartAverageIcon, SlidersHorizontalIcon, Timer01Icon } from '@hugeicons/core-free-icons'
import { TABS, type TabKey } from '../constants'

const TAB_ICONS = {
    timer: Timer01Icon,
    stats: ChartAverageIcon,
    settings: SlidersHorizontalIcon
}

interface TabBarProps {
    activeTab: TabKey
    onChange: (tab: TabKey) => void
}

export default function TabBar({ activeTab, onChange }: TabBarProps) {
    return (
        <nav className="tab-bar" aria-label="Application sections">
            <ul>
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab
                    return (
                        <li key={tab.key}>
                            <button
                                type="button"
                                className={`tab-item${isActive ? ' is-active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => onChange(tab.key)}
                            >
                                <HugeiconsIcon icon={TAB_ICONS[tab.key]} size={18} strokeWidth={2} />
                                <span>{tab.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}