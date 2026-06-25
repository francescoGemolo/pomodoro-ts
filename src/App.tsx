import { useState } from 'react'
import TabBar from './components/TabBar'
import PageHeader from './components/PageHeader'
import TimerCard from './components/TimerCard'
import StatsGrid from './components/StatsGrid'
import { usePomodoroTimer } from './hooks/usePomodoroTimer'
import type { TabKey } from './constants'

export default function App() {
    const [activeTab, setActiveTab] = useState<TabKey>('timer')
    const timer = usePomodoroTimer()

    return (
        <div className="app">
            <TabBar activeTab={activeTab} onChange={setActiveTab} />

            <PageHeader statusLabel={timer.statusLabel} phase={timer.phase} />

            {activeTab === 'timer' && (
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
            )}

            {activeTab === 'settings' && (
                <main className="timer-card animate-fade-in">
                    <section className="timer-panel" aria-label="Settings">
                        <p className="timer-state">Settings</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%', padding: 'var(--space-4) 0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'var(--weight-semibold)' }}>Focus Time (min)</span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="60" 
                                    value={timer.focusMinutes} 
                                    onChange={(e) => timer.setFocusMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{ width: '4.5rem', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-border)', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'var(--weight-bold)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'var(--weight-semibold)' }}>Short Break (min)</span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="30" 
                                    value={timer.shortBreakMinutes} 
                                    onChange={(e) => timer.setShortBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{ width: '4.5rem', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-border)', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'var(--weight-bold)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'var(--weight-semibold)' }}>Long Break (min)</span>
                                <input 
                                    type="number" 
                                    min="1" 
                                    max="60" 
                                    value={timer.longBreakMinutes} 
                                    onChange={(e) => timer.setLongBreakMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                                    style={{ width: '4.5rem', padding: 'var(--space-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-border)', textAlign: 'center', fontFamily: 'inherit', fontWeight: 'var(--weight-bold)' }}
                                />
                            </div>
                        </div>
                    </section>
                </main>
            )}

            <div className="desktop-only-stats">
                <StatsGrid
                    focusMinutesToday={timer.focusMinutesToday}
                    sessionsCompletedToday={timer.sessionsCompletedToday}
                    sessionsUntilLongBreak={timer.sessionsUntilLongBreak}
                />
            </div>
        </div>
    )
}