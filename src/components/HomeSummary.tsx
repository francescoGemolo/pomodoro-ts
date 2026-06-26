interface HomeSummaryProps {
    focusMinutesToday: number
    sessionsCompletedToday: number
    sessionsUntilLongBreak: number
}

export default function HomeSummary({
    focusMinutesToday,
    sessionsCompletedToday,
    sessionsUntilLongBreak
}: HomeSummaryProps) {
    return (
        <footer className="stats-grid home-summary">
            <article className="stat-card">
                <p className="stat-label">Today</p>
                <p className="stat-value">{focusMinutesToday}m</p>
                <p className="stat-sub">{sessionsCompletedToday} sessions</p>
            </article>

            <article className="stat-card">
                <p className="stat-label">Current cycle</p>
                <p className="stat-value">{sessionsUntilLongBreak}</p>
                <p className="stat-sub">until long break</p>
            </article>
        </footer>
    )
}