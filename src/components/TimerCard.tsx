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
    return (
        <main className={`timer-card card-state-${phase} animate-fade-in`}>
            <section className="timer-panel" aria-label="Focus session">
                <p className="timer-state">{statusLabel}</p>
                <time className="timer-display" dateTime={isoDuration}>
                    {formattedTime}
                </time>
                <p className="timer-message">{messageLabel}</p>
                <div className="timer-actions">
                    <button type="button" className="btn-primary" onClick={onPrimaryAction}>
                        {primaryLabel}
                    </button>
                    {phase === 'focus' && (
                        <button type="button" className="btn-secondary" onClick={onStartBreak}>
                            Skip to Break
                        </button>
                    )}
                    {phase !== 'idle' && (
                        <button type="button" className="btn-secondary btn-reset" onClick={onReset}>
                            Reset Session
                        </button>
                    )}
                </div>
            </section>
        </main>
    )
}