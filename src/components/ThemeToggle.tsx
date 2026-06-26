import { HugeiconsIcon } from '@hugeicons/react'
import { SunIcon, Moon02Icon } from '@hugeicons/core-free-icons'
import type { ThemeMode } from '../hooks/useTheme'

interface ThemeToggleProps {
    theme: ThemeMode
    onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
    const isDark = theme === 'dark'

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={ onToggle }
            aria-label={ isDark ? 'Switch to light mode' : 'Switch to dark mode' }
            aria-pressed={ isDark }
        >
            <HugeiconsIcon
                icon={ SunIcon }
                altIcon={ Moon02Icon }
                showAlt={ isDark }
                size={ 18 }
                strokeWidth={ 1.75 }
            />
        </button>
    )
}