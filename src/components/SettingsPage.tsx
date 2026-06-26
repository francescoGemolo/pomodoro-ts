interface SettingsPageProps {
    focusMinutes: number
    shortBreakMinutes: number
    longBreakMinutes: number
    onFocusMinutesChange: (minutes: number) => void
    onShortBreakMinutesChange: (minutes: number) => void
    onLongBreakMinutesChange: (minutes: number) => void
}

function clampMinutes(value: string, max: number): number {
    const parsed = parseInt(value, 10)
    if (Number.isNaN(parsed)) return 1
    return Math.min(Math.max(parsed, 1), max)
}

export default function SettingsPage({
    focusMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    onFocusMinutesChange,
    onShortBreakMinutesChange,
    onLongBreakMinutesChange
}: SettingsPageProps) {
    return (
        <main className="timer-card animate-fade-in">
            <section className="timer-panel" aria-label="Settings">
                <p className="timer-state">Settings</p>

                <div className="settings-list">
                    <label className="settings-row">
                        <span>Focus Time (min)</span>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            className="settings-input"
                            value={focusMinutes}
                            onChange={(e) => onFocusMinutesChange(clampMinutes(e.target.value, 60))}
                        />
                    </label>

                    <label className="settings-row">
                        <span>Short Break (min)</span>
                        <input
                            type="number"
                            min="1"
                            max="30"
                            className="settings-input"
                            value={shortBreakMinutes}
                            onChange={(e) => onShortBreakMinutesChange(clampMinutes(e.target.value, 30))}
                        />
                    </label>

                    <label className="settings-row">
                        <span>Long Break (min)</span>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            className="settings-input"
                            value={longBreakMinutes}
                            onChange={(e) => onLongBreakMinutesChange(clampMinutes(e.target.value, 60))}
                        />
                    </label>
                </div>
            </section>
        </main>
    )
}