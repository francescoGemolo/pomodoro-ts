import type { CSSProperties } from 'react'

interface StatsGridProps {
    focusMinutesToday: number
    sessionsCompletedToday: number
    sessionsUntilLongBreak: number
}

const WEEK_CHART: { day: string; ratio: number }[] = [
    { day: 'W', ratio: 0.55 },
    { day: 'T', ratio: 0.2 },
    { day: 'F', ratio: 0.85 },
    { day: 'S', ratio: 0.35 },
    { day: 'S', ratio: 0.1 },
    { day: 'M', ratio: 0.1 },
    { day: 'T', ratio: 0.1 }
]

export default function StatsGrid({
    focusMinutesToday,
    sessionsCompletedToday,
    sessionsUntilLongBreak
}: StatsGridProps) {
    return (
        <footer className="stats-grid">
            <article className="stat-card">
                <p className="stat-label">Today</p>
                <p className="stat-value">{focusMinutesToday}m</p>
                <p className="stat-sub">{sessionsCompletedToday} sessions</p>
            </article>

            <article className="stat-card">
                <p className="stat-label">Streak</p>
                <p className="stat-value">0</p>
                <p className="stat-sub">days</p>
            </article>

            <article className="stat-card">
                <p className="stat-label">Long break</p>
                <p className="stat-value">{sessionsUntilLongBreak}</p>
                <p className="stat-sub">sessions left</p>
            </article>

            <article className="stat-card stat-card-chart">
                <p className="stat-label">Last 7 days</p>
                <ul className="week-chart">
                    {WEEK_CHART.map((item, index) => (
                        <li key={`${item.day}-${index}`} style={{ '--bar': item.ratio } as CSSProperties}>
                            <span />
                            <em>{item.day}</em>
                        </li>
                    ))}
                </ul>
            </article>
        </footer>
    )
}