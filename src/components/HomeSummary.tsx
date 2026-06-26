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
        <footer className="home-summary">
            <div className="home-stat">
                <span className="home-stat-value">{focusMinutesToday}m</span>
                <span className="home-stat-label">{sessionsCompletedToday} sessions today</span>
            </div>
            <div className="home-stat-sep" />
            <div className="home-stat">
                <span className="home-stat-value">{sessionsUntilLongBreak}</span>
                <span className="home-stat-label">until long break</span>
            </div>
        </footer>
    )
}