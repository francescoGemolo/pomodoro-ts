import { useEffect } from 'react'
import { useLottie } from 'lottie-react'
import catAnimation from '../assets/animations/catAnimation.json'
import ThemeToggle from './ThemeToggle'
import type { ThemeMode } from '../hooks/useTheme'

interface TimerCardProps {
    statusLabel: string
    formattedTime: string
    isoDuration: string
    messageLabel: string
    primaryLabel: string
    phase: string
    onPrimaryAction: () => void
    onStartBreak: () => void
    onReset: () => void
    theme: ThemeMode
    onToggleTheme: () => void
}

export default function TimerCard({
    statusLabel,
    formattedTime,
    isoDuration,
    messageLabel,
    primaryLabel,
    phase,
    onPrimaryAction,
    onStartBreak,
    onReset,
    theme,
    onToggleTheme
}: TimerCardProps) {
    const canSkipToBreak = phase === 'focus'
    const canReset = phase !== 'idle'

    const { View, play, pause } = useLottie({
        animationData: catAnimation,
        loop: true,
        autoplay: false
    })

    useEffect(() => {
        if (phase === 'focus') {
            play()
        } else {
            pause()
        }
    }, [phase, play, pause])

    return (
        <main className={`timer-card card-state-${phase} animate-fade-in`}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <section className="timer-layout">
                <div className="timer-panel">
                    <p className="timer-state">
                        {statusLabel}
                    </p>

                    <time
                        className="timer-display"
                        dateTime={isoDuration}
                    >
                        {formattedTime}
                    </time>

                    <p className="timer-message">
                        {messageLabel}
                    </p>

                    <div className="timer-actions">
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={onPrimaryAction}
                        >
                            {primaryLabel}
                        </button>

                        <button
                            type="button"
                            className={`btn-secondary btn-reset${canReset ? '' : ' btn-slot-hidden'}`}
                            onClick={onReset}
                            disabled={!canReset}
                            aria-hidden={!canReset}
                            tabIndex={canReset ? 0 : -1}
                        >
                            Reset Session
                        </button>

                        <button
                            type="button"
                            className={`btn-break${canSkipToBreak ? '' : ' btn-slot-hidden'}`}
                            onClick={onStartBreak}
                            disabled={!canSkipToBreak}
                            aria-hidden={!canSkipToBreak}
                            tabIndex={canSkipToBreak ? 0 : -1}
                        >
                            Take a Break
                        </button>
                    </div>
                </div>

                <div className="cat-container">
                    <div className="cat-peek">
                        {View}
                    </div>
                </div>
            </section>
        </main>
    )
}