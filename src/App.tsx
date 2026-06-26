import { useState } from 'react'
import TabBar from './components/TabBar'
import PageHeader from './components/PageHeader'
import TimerCard from './components/TimerCard'
import HomeSummary from './components/HomeSummary'
import StatsPage from './components/StatsPage'
import SettingsPage from './components/SettingsPage'
import { usePomodoroTimer } from './hooks/usePomodoroTimer'
import type { TabKey } from './constants'

export default function App() {
    const [activeTab, setActiveTab] = useState<TabKey>('timer')
    const timer = usePomodoroTimer()

    return (
        <div className="app">
            <TabBar activeTab={activeTab} onChange={setActiveTab} />

            <PageHeader
                statusLabel={timer.statusLabel}
                phase={timer.phase}
            />

            {activeTab === 'timer' && (
                <>
                    <TimerCard
                        statusLabel={timer.statusLabel}
                        formattedTime={timer.formattedTime}
                        isoDuration={timer.isoDuration}
                        messageLabel={timer.messageLabel}
                        primaryLabel={timer.primaryLabel}
                        phase={timer.phase}
                        onPrimaryAction={timer.startOrToggleFocus}
                        onStartBreak={timer.startBreak}
                        onReset={timer.resetTimer}
                    />

                    <HomeSummary
                        focusMinutesToday={timer.focusMinutesToday}
                        sessionsCompletedToday={timer.sessionsCompletedToday}
                        sessionsUntilLongBreak={timer.sessionsUntilLongBreak}
                        streak={timer.streak}
                        totalSessions={timer.totalSessions}
                        totalFocusHours={timer.totalFocusHours}
                    />
                </>
            )}

            {activeTab === 'stats' && (
                <StatsPage
                    focusMinutesToday={timer.focusMinutesToday}
                    sessionsCompletedToday={timer.sessionsCompletedToday}
                    streak={timer.streak}
                    totalSessions={timer.totalSessions}
                    totalFocusHours={timer.totalFocusHours}
                    weeklyChart={timer.weeklyChart}
                    onResetStats={timer.resetStats}
                />
            )}

            {activeTab === 'settings' && (
                <SettingsPage
                    focusMinutes={timer.focusMinutes}
                    shortBreakMinutes={timer.shortBreakMinutes}
                    longBreakMinutes={timer.longBreakMinutes}
                    onFocusMinutesChange={timer.setFocusMinutes}
                    onShortBreakMinutesChange={timer.setShortBreakMinutes}
                    onLongBreakMinutesChange={timer.setLongBreakMinutes}
                />
            )}
        </div>
    )
}