import { useEffect, useRef } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import catAnimation from '../assets/animations/catAnimation.json'

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
    onReset
}: TimerCardProps) {
    const catPlayerRef = useRef<Player>(null)

    const canSkipToBreak = phase === 'focus'
    const canReset = phase !== 'idle'

    useEffect(() => {
        if (!catPlayerRef.current) return

        if (phase === 'focus') {
            catPlayerRef.current.play()
        } else {
            catPlayerRef.current.pause()
        }
    }, [phase])

    return (
        <main className={`timer-card card-state-${phase} animate-fade-in`}>
            <section className="timer-layout">
                <div className="timer-panel">
                    <p className="timer-state">{statusLabel}</p>

                    <time className="timer-display" dateTime={isoDuration}>
                        {formattedTime}
                    </time>

                    <p className="timer-message">{messageLabel}</p>

                    <div className="timer-actions">
                        <button type="button" className="btn-primary" onClick={onPrimaryAction}>
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
                    </div>

                    <button
                        type="button"
                        className={`btn-break-link${canSkipToBreak ? '' : ' btn-slot-hidden'}`}
                        onClick={onStartBreak}
                        disabled={!canSkipToBreak}
                        aria-hidden={!canSkipToBreak}
                        tabIndex={canSkipToBreak ? 0 : -1}
                    >
                        Take a Break
                    </button>
                </div>

                <div className="cat-container">
                    <div className="cat-peek">
                        <Player ref={catPlayerRef} src={catAnimation} loop />
                    </div>
                </div>
            </section>
        </main>
    )
}