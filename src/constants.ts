export const FOCUS_MINUTES = 20
export const SHORT_BREAK_MINUTES = 5
export const LONG_BREAK_MINUTES = 15
export const SESSIONS_BEFORE_LONG_BREAK = 4

export const FOCUS_SECONDS = FOCUS_MINUTES * 60
export const SHORT_BREAK_SECONDS = SHORT_BREAK_MINUTES * 60
export const LONG_BREAK_SECONDS = LONG_BREAK_MINUTES * 60

export type TabKey = 'timer' | 'stats' | 'settings'

export const TABS: { key: TabKey; label: string }[] = [
    { key: 'timer', label: 'Timer' },
    { key: 'stats', label: 'Stats' },
    { key: 'settings', label: 'Settings' }
]