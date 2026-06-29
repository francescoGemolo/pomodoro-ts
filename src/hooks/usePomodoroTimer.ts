import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getDateKey, getWeekdayLabel } from '../utils/dateKey'

export type Phase = 'idle' | 'focus' | 'short-break' | 'long-break' | 'paused'

type DayStats = { minutes: number; sessions: number }
type History = Record<string, DayStats>

const HISTORY_STORAGE_KEY = 'ludis-focus-history'
const WEEK_LENGTH = 7
const STREAK_LOOKBACK_DAYS = 365

function formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function formatIsoDuration(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `PT${minutes}M${seconds}S`
}

function loadHistory(): History {
    try {
        const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY)
        return raw ? (JSON.parse(raw) as History) : {}
    } catch {
        return {}
    }
}

function saveHistory(history: History) {
    try {
        window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch {
        // Storage may be unavailable (e.g. private browsing); stats simply won't persist.
    }
}

export function usePomodoroTimer() {
    const [focusMinutes, setFocusMinutes] = useState(60)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(10)
    const [longBreakMinutes, setLongBreakMinutes] = useState(20)

    const [phase, setPhase] = useState<Phase>('idle')
    const [previousPhase, setPreviousPhase] = useState<Phase>('focus')
    const [secondsLeft, setSecondsLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [cyclesCompleted, setCyclesCompleted] = useState(0)

    const [history, setHistory] = useState<History>(() => loadHistory())

    const activeFocusMinutesRef = useRef(focusMinutes)

    useEffect(() => {
        saveHistory(history)
    }, [history])

    useEffect(() => {
        if (phase === 'idle') {
            setSecondsLeft(focusMinutes * 60)
        }
    }, [focusMinutes, phase])

    useEffect(() => {
        if (!isRunning) return

        const intervalId = window.setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => window.clearInterval(intervalId)
    }, [isRunning])

    const recordCompletedFocusSession = useCallback(() => {
        const completedMinutes = activeFocusMinutesRef.current
        const todayKey = getDateKey(new Date())
        setHistory((prev) => {
            const today = prev[todayKey] ?? { minutes: 0, sessions: 0 }
            return {
                ...prev,
                [todayKey]: {
                    minutes: today.minutes + completedMinutes,
                    sessions: today.sessions + 1
                }
            }
        })
    }, [])

    useEffect(() => {
        if (secondsLeft !== 0 || isRunning || phase === 'idle' || phase === 'paused') return

        if (phase === 'focus') {
            const nextCycles = cyclesCompleted + 1
            setCyclesCompleted(nextCycles)
            recordCompletedFocusSession()

            if (nextCycles >= 4) {
                setPhase('long-break')
                setSecondsLeft(longBreakMinutes * 60)
                setCyclesCompleted(0)
            } else {
                setPhase('short-break')
                setSecondsLeft(shortBreakMinutes * 60)
            }
            setIsRunning(true)
        } else if (phase === 'short-break' || phase === 'long-break') {
            activeFocusMinutesRef.current = focusMinutes
            setPhase('focus')
            setSecondsLeft(focusMinutes * 60)
            setIsRunning(true)
        }
    }, [secondsLeft, isRunning, phase, cyclesCompleted, focusMinutes, shortBreakMinutes, longBreakMinutes, recordCompletedFocusSession])

    const startOrToggleFocus = useCallback(() => {
        if (phase === 'idle') {
            activeFocusMinutesRef.current = focusMinutes
            setPhase('focus')
            setSecondsLeft(focusMinutes * 60)
            setIsRunning(true)
            return
        }

        if (phase === 'paused') {
            setPhase(previousPhase)
            setIsRunning(true)
            return
        }

        if (isRunning) {
            setIsRunning(false)
            setPreviousPhase(phase)
            setPhase('paused')
            return
        }

        setIsRunning(true)
    }, [phase, isRunning, previousPhase, focusMinutes])

    const startBreak = useCallback(() => {
        setIsRunning(false)
        const nextCycles = cyclesCompleted + 1
        if (nextCycles >= 4) {
            setPhase('long-break')
            setSecondsLeft(longBreakMinutes * 60)
            setCyclesCompleted(0)
        } else {
            setPhase('short-break')
            setSecondsLeft(shortBreakMinutes * 60)
            setCyclesCompleted(nextCycles)
        }
        setIsRunning(true)
    }, [cyclesCompleted, shortBreakMinutes, longBreakMinutes])

    const resetTimer = useCallback(() => {
        setIsRunning(false)
        setPhase('idle')
        setCyclesCompleted(0)
        setSecondsLeft(focusMinutes * 60)
    }, [focusMinutes])

    const resetStats = useCallback(() => {
        setHistory({})
    }, [])

    const statusLabel = (() => {
        if (phase === 'idle') return 'Ready'
        if (phase === 'focus') return 'Focusing'
        if (phase === 'short-break') return 'Short Break'
        if (phase === 'long-break') return 'Long Break'
        if (phase === 'paused') return 'Paused'
        return 'Ready'
    })()

    const messageLabel = (() => {
        if (phase === 'idle') return 'A clean slate awaits.'
        if (phase === 'focus') return 'Stay in the zone.'
        if (phase === 'short-break') return 'Take a quick breath.'
        if (phase === 'long-break') return 'Time to fully recharge.'
        if (phase === 'paused') return 'Ready when you are.'
        return 'A clean slate awaits.'
    })()

    const primaryLabel = (() => {
        if (phase === 'idle') return 'Start Focus'
        if (phase === 'paused') return 'Resume'
        if (isRunning) return 'Pause'
        return 'Start Focus'
    })()

    const sessionsUntilLongBreak = Math.max(0, 4 - cyclesCompleted)

    const todayKey = getDateKey(new Date())
    const todayStats = history[todayKey] ?? { minutes: 0, sessions: 0 }

    const weeklyChart = useMemo(() => {
        const days = Array.from({ length: WEEK_LENGTH }, (_, index) => {
            const date = new Date()
            date.setDate(date.getDate() - (WEEK_LENGTH - 1 - index))
            const key = getDateKey(date)
            return {
                key,
                label: getWeekdayLabel(date),
                minutes: history[key]?.minutes ?? 0,
                isToday: key === todayKey
            }
        })

        const maxMinutes = Math.max(...days.map((day) => day.minutes), 1)

        return days.map((day) => ({
            ...day,
            ratio: day.minutes === 0 ? 0 : day.minutes / maxMinutes
        }))
    }, [history, todayKey])

    const streak = useMemo(() => {
        let count = 0
        const cursor = new Date()

        for (let i = 0; i < STREAK_LOOKBACK_DAYS; i++) {
            const key = getDateKey(cursor)
            const sessions = history[key]?.sessions ?? 0

            if (sessions > 0) {
                count += 1
            } else if (key !== todayKey) {
                break
            }

            cursor.setDate(cursor.getDate() - 1)
        }

        return count
    }, [history, todayKey])

    const { totalSessions, totalMinutes } = useMemo(() => {
        return Object.values(history).reduce(
            (totals, day) => ({
                totalSessions: totals.totalSessions + day.sessions,
                totalMinutes: totals.totalMinutes + day.minutes
            }),
            { totalSessions: 0, totalMinutes: 0 }
        )
    }, [history])

    return {
        phase,
        sessionsUntilLongBreak,
        statusLabel,
        messageLabel,
        primaryLabel,
        formattedTime: formatTime(secondsLeft),
        isoDuration: formatIsoDuration(secondsLeft),
        startOrToggleFocus,
        startBreak,
        resetTimer,
        focusMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        setFocusMinutes,
        setShortBreakMinutes,
        setLongBreakMinutes,
        sessionsCompletedToday: todayStats.sessions,
        focusMinutesToday: todayStats.minutes,
        streak,
        totalSessions,
        totalFocusHours: Math.round((totalMinutes / 60) * 10) / 10,
        weeklyChart,
        resetStats
    }
}