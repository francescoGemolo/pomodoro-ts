import { useCallback, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'ludis-focus-theme'
const LIGHT_STATUS_BAR_COLOR = '#ffffff'
const DARK_STATUS_BAR_COLOR = '#1e1815'

export function useTheme() {
    const [theme, setTheme] = useState<ThemeMode>('light')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)

        const statusBarMeta = document.querySelector('meta[name="theme-color"]')
        if (statusBarMeta) {
            statusBarMeta.setAttribute('content', theme === 'dark' ? DARK_STATUS_BAR_COLOR : LIGHT_STATUS_BAR_COLOR)
        }

        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme)
        } catch {
            // Storage may be unavailable (e.g. private browsing); preference simply won't persist.
        }
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }, [])

    return { theme, toggleTheme }
}