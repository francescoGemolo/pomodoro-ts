export type TabKey = 'timer' | 'stats' | 'settings'

export const TABS: { key: TabKey; label: string }[] = [
    { key: 'timer', label: 'Timer' },
    { key: 'stats', label: 'Stats' },
    { key: 'settings', label: 'Settings' }
]