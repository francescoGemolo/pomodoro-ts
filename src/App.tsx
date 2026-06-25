import { useState } from 'react'
import TabBar from './components/TabBar'
import PageHeader from './components/PageHeader'
import TimerCard from './components/TimerCard'
import StatsGrid from './components/StatsGrid'
import PlaceholderView from './components/PlaceholderView'
import { usePomodoroTimer } from './hooks/usePomodoroTimer'
import type { TabKey } from './constants'

export default function App() {
    const [activeTab, setActiveTab] = useState<TabKey>('timer')
    const timer = usePomodoroTimer()

    return (
        <div className="app">
            <TabBar activeTab={activeTab} onChange={setActiveTab} />

            <PageHeader statusLabel={timer.statusLabel} />

            {activeTab === 'timer' && (
                <TimerCard
                    statusLabel={timer.statusLabel}
                    formattedTime={timer.formattedTime}
                    isoDuration={timer.isoDuration}
                    messageLabel={timer.messageLabel}
                    primaryLabel={timer.primaryLabel}
                    onPrimaryAction={timer.startOrToggleFocus}
                    onStartBreak={timer.startBreak}
                />
            )}

            {activeTab === 'stats' && (
                <PlaceholderView title="Stats" description="Le statistiche dettagliate arrivano in un prossimo aggiornamento." />
            )}

            {activeTab === 'settings' && (
                <PlaceholderView title="Settings" description="Le impostazioni di durata e notifiche arrivano in un prossimo aggiornamento." />
            )}

            <StatsGrid
                focusMinutesToday={timer.focusMinutesToday}
                sessionsCompletedToday={timer.sessionsCompletedToday}
                sessionsUntilLongBreak={timer.sessionsUntilLongBreak}
            />
        </div>
    )
}