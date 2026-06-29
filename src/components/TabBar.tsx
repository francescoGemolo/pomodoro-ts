import { TABS, type TabKey } from '../constants'

interface IconProps {
    size?: number
    strokeWidth?: number
}

function TimerIcon({ size = 18, strokeWidth = 2 }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.0809 13.152L8 7L13.4196 11.2796C14.1901 11.888 14.1941 13.0472 13.4277 13.6607C12.6614 14.2743 11.5189 14.0266 11.0809 13.152Z" />
            <path d="M5 4.82C3.14864 6.63902 2 9.17385 2 11.9776C2 17.5129 6.47715 22.0001 12 22.0001C17.5228 22.0001 22 17.5129 22 11.9776C22 7.1242 18.5581 3.07656 13.9872 2.15288C13.1512 1.98394 12.7332 1.89947 12.3666 2.20022C12 2.50097 12 2.98714 12 3.95949V4.96175" />
        </svg>
    )
}

function StatsIcon({ size = 18, strokeWidth = 2 }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
            <path d="M20.9877 21H9.9877C6.68787 21 5.03795 21 4.01283 19.9749C2.9877 18.9497 2.9877 17.2998 2.9877 14V3" />
            <path d="M6.9877 7C7.61628 5.87847 8.46901 5 9.781 5C15.3279 5 12.2101 17 18.1708 17C19.4921 17 20.3397 16.1157 20.9877 15" />
            <path d="M10.9998 11.0006H10.9873M11.0123 11.0006C11.0123 11.0144 11.0011 11.0256 10.9873 11.0256C10.9735 11.0256 10.9623 11.0144 10.9623 11.0006C10.9623 10.9868 10.9735 10.9756 10.9873 10.9756C11.0011 10.9756 11.0123 10.9868 11.0123 11.0006Z" strokeLinejoin="round" />
            <path d="M6.99981 11.0006H6.98731M7.01231 11.0006C7.01231 11.0144 7.00112 11.0256 6.98731 11.0256C6.9735 11.0256 6.96231 11.0144 6.96231 11.0006C6.96231 10.9868 6.9735 10.9756 6.98731 10.9756C7.00112 10.9756 7.01231 10.9868 7.01231 11.0006Z" strokeLinejoin="round" />
            <path d="M20.9998 11.0006H20.9873M21.0123 11.0006C21.0123 11.0144 21.0011 11.0256 20.9873 11.0256C20.9735 11.0256 20.9623 11.0144 20.9623 11.0006C20.9623 10.9868 20.9735 10.9756 20.9873 10.9756C21.0011 10.9756 21.0123 10.9868 21.0123 11.0006Z" strokeLinejoin="round" />
            <path d="M16.9998 11.0006H16.9873M17.0123 11.0006C17.0123 11.0144 17.0011 11.0256 16.9873 11.0256C16.9735 11.0256 16.9623 11.0144 16.9623 11.0006C16.9623 10.9868 16.9735 10.9756 16.9873 10.9756C17.0011 10.9756 17.0123 10.9868 17.0123 11.0006Z" strokeLinejoin="round" />
        </svg>
    )
}

function SettingsIcon({ size = 18, strokeWidth = 2 }: IconProps) {
    return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
            <path d="M3.99963 5.00055L9.99963 5.00031" />
            <path d="M12.9996 5.00031L19.9996 5.00031" />
            <path d="M15.9996 9.00031L15.9996 15.0003" />
            <path d="M9.99963 2.00031L9.99963 8.00031" />
            <path d="M11.9996 16.0003L11.9996 22.0003" />
            <path d="M15.9996 12.0001L19.9996 12.0003" />
            <path d="M3.99963 12.0005L12.9996 12.0003" />
            <path d="M11.9996 19.0003L19.9996 19.0003" />
            <path d="M3.99963 19.0005L8.99963 19.0003" />
        </svg>
    )
}

const TAB_ICONS = {
    timer: TimerIcon,
    stats: StatsIcon,
    settings: SettingsIcon
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
                    const Icon = TAB_ICONS[tab.key]
                    return (
                        <li key={tab.key}>
                            <button
                                type="button"
                                className={`tab-item${isActive ? ' is-active' : ''}`}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => onChange(tab.key)}
                            >
                                <Icon size={18} strokeWidth={2} />
                                <span>{tab.label}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}