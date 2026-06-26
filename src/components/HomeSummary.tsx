interface HomeSummaryProps {
    focusMinutesToday: number
    sessionsCompletedToday: number
    sessionsUntilLongBreak: number
    streak: number
    totalSessions: number
    totalFocusHours: number
}

export default function HomeSummary({
    focusMinutesToday,
    sessionsCompletedToday,
    sessionsUntilLongBreak,
    streak,
    totalSessions,
    totalFocusHours
}: HomeSummaryProps) {
    return (
        <footer className="home-summary">
            <div className="home-stat">
                <span className="home-stat-label">Today</span>
                <span className="home-stat-value">{focusMinutesToday}m</span>
                <span className="home-stat-sub">{sessionsCompletedToday} sessions</span>
            </div>

            <div className="home-stat-sep" />

            <div className="home-stat">
                <span className="home-stat-label">Streak</span>
                <span className="home-stat-value">{streak}d</span>
                <span className="home-stat-sub">in a row</span>
            </div>

            <div className="home-stat-sep" />

            <div className="home-stat">
                <span className="home-stat-label">All time</span>
                <span className="home-stat-value">{totalFocusHours}h</span>
                <span className="home-stat-sub">{totalSessions} sessions</span>
            </div>

            <div className="home-stat-sep" />

            <div className="home-stat home-stat--accent">
                <span className="home-stat-label">To break</span>
                <span className="home-stat-value">{sessionsUntilLongBreak}</span>
                <span className="home-stat-sub">sessions left</span>
            </div>
        </footer>
    )
}