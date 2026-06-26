import type { CSSProperties } from 'react'

interface WeeklyChartItem {
    key: string
    label: string
    minutes: number
    ratio: number
    isToday: boolean
}

interface StatsPageProps {
    focusMinutesToday: number
    sessionsCompletedToday: number
    streak: number
    totalSessions: number
    totalFocusHours: number
    weeklyChart: WeeklyChartItem[]
    onResetStats: () => void
}

export default function StatsPage({
    focusMinutesToday,
    sessionsCompletedToday,
    streak,
    totalSessions,
    totalFocusHours,
    weeklyChart,
    onResetStats
}: StatsPageProps) {
    return (
        <main className="timer-card animate-fade-in">
            <section className="stats-page">
                <div className="stats-grid">
                    <article className="stat-card">
                        <p className="stat-label">Today</p>
                        <p className="stat-value">{focusMinutesToday}m</p>
                        <p className="stat-sub">{sessionsCompletedToday} sessions</p>
                    </article>

                    <article className="stat-card">
                        <p className="stat-label">Streak</p>
                        <p className="stat-value">{streak}</p>
                        <p className="stat-sub">{streak === 1 ? 'day' : 'days'}</p>
                    </article>

                    <article className="stat-card">
                        <p className="stat-label">All-time</p>
                        <p className="stat-value">{totalSessions}</p>
                        <p className="stat-sub">sessions</p>
                    </article>

                    <article className="stat-card">
                        <p className="stat-label">All-time</p>
                        <p className="stat-value">{totalFocusHours}h</p>
                        <p className="stat-sub">focused</p>
                    </article>
                </div>

                <article className="stat-card stat-card-chart stats-page-chart">
                    <p className="stat-label">Last 7 days</p>
                    <ul className="week-chart">
                        {weeklyChart.map((day) => (
                            <li
                                key={day.key}
                                className={day.isToday ? 'is-today' : undefined}
                                style={{ '--bar': day.ratio } as CSSProperties}
                            >
                                <span />
                                <em>{day.label}</em>
                            </li>
                        ))}
                    </ul>
                </article>

                <button type="button" className="stats-reset" onClick={onResetStats}>
                    Reset Stats
                </button>
            </section>
        </main>
    )
}