interface TimerCardProps {
    statusLabel: string
    formattedTime: string
    isoDuration: string
    messageLabel: string
    primaryLabel: string
    onPrimaryAction: () => void
    onStartBreak: () => void
}

export default function TimerCard({
    statusLabel,
    formattedTime,
    isoDuration,
    messageLabel,
    primaryLabel,
    onPrimaryAction,
    onStartBreak
}: TimerCardProps) {
    return (
        <main className="timer-card animate-fade-in">
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
                    <button type="button" className="btn-secondary" onClick={onStartBreak}>
                        Take a break
                    </button>
                </div>
            </section>
        </main>
    )
}