import { HugeiconsIcon } from '@hugeicons/react'
import { SunIcon, Moon02Icon } from '@hugeicons/core-free-icons'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'}
        >
            <HugeiconsIcon
                icon={SunIcon}
                altIcon={Moon02Icon}
                showAlt={theme === 'dark'}
                size={18}
                strokeWidth={1.75}
                color="currentColor"
            />
        </button>
    )
}