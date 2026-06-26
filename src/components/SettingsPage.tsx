interface MinuteStepperProps {
    label: string
    value: number
    max: number
    onChange: (minutes: number) => void
}

function clampMinutes(value: number, max: number): number {
    if (Number.isNaN(value)) return 1
    return Math.min(Math.max(value, 1), max)
}

function MinuteStepper({ label, value, max, onChange }: MinuteStepperProps) {
    return (
        <div className="settings-row">
            <span>{label}</span>
            <div className="settings-stepper">
                <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => onChange(clampMinutes(value - 1, max))}
                    disabled={value <= 1}
                    aria-label={`Decrease ${label}`}
                >
                    −
                </button>

                <input
                    type="number"
                    min={1}
                    max={max}
                    className="settings-input"
                    value={value}
                    onChange={(e) => onChange(clampMinutes(parseInt(e.target.value, 10), max))}
                    aria-label={label}
                />

                <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => onChange(clampMinutes(value + 1, max))}
                    disabled={value >= max}
                    aria-label={`Increase ${label}`}
                >
                    +
                </button>
            </div>
        </div>
    )
}

interface SettingsPageProps {
    focusMinutes: number
    shortBreakMinutes: number
    longBreakMinutes: number
    onFocusMinutesChange: (minutes: number) => void
    onShortBreakMinutesChange: (minutes: number) => void
    onLongBreakMinutesChange: (minutes: number) => void
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
                    <MinuteStepper label="Focus Time (min)" value={focusMinutes} max={60} onChange={onFocusMinutesChange} />
                    <MinuteStepper label="Short Break (min)" value={shortBreakMinutes} max={30} onChange={onShortBreakMinutesChange} />
                    <MinuteStepper label="Long Break (min)" value={longBreakMinutes} max={60} onChange={onLongBreakMinutesChange} />
                </div>
            </section>
        </main>
    )
}