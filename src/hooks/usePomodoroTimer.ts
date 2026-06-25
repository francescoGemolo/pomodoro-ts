import { useCallback, useEffect, useState } from 'react'
import { SESSIONS_BEFORE_LONG_BREAK } from '../constants'

export type Phase = 'focus' | 'short-break' | 'long-break'

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

export function usePomodoroTimer() {
    const [focusMinutes, setFocusMinutes] = useState(20)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
    const [longBreakMinutes, setLongBreakMinutes] = useState(15)

    const [phase, setPhase] = useState<Phase>('focus')
    const [secondsLeft, setSecondsLeft] = useState(20 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [sessionsCompletedToday, setSessionsCompletedToday] = useState(0)
    const [focusMinutesToday, setFocusMinutesToday] = useState(0)
    const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState(SESSIONS_BEFORE_LONG_BREAK)

    useEffect(() => {
        if (isRunning) return
        if (phase === 'focus') {
            setSecondsLeft(focusMinutes * 60)
        } else if (phase === 'short-break') {
            setSecondsLeft(shortBreakMinutes * 60)
        } else if (phase === 'long-break') {
            setSecondsLeft(longBreakMinutes * 60)
        }
    }, [focusMinutes, shortBreakMinutes, longBreakMinutes, phase, isRunning])

    useEffect(() => {
        if (!isRunning) return

        const intervalId = window.setInterval(() => {
            setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => window.clearInterval(intervalId)
    }, [isRunning])

    useEffect(() => {
        if (secondsLeft !== 0 || !isRunning) return

        if (phase === 'focus') {
            setSessionsCompletedToday((count) => count + 1)
            setFocusMinutesToday((minutes) => minutes + focusMinutes)
            setSessionsUntilLongBreak((count) => Math.max(count - 1, 0))
        }

        setIsRunning(false)
        setPhase('focus')
        setSecondsLeft(focusMinutes * 60)
    }, [secondsLeft, isRunning, phase, focusMinutes])

    const startOrToggleFocus = useCallback(() => {
        if (phase !== 'focus') {
            setPhase('focus')
            setSecondsLeft(focusMinutes * 60)
            setIsRunning(true)
            return
        }

        if (isRunning) {
            setIsRunning(false)
            return
        }

        setSecondsLeft((prev) => (prev === 0 ? focusMinutes * 60 : prev))
        setIsRunning(true)
    }, [phase, isRunning, focusMinutes])

    const startBreak = useCallback(() => {
        const isLongBreakDue = sessionsUntilLongBreak === 0
        const nextPhase = isLongBreakDue ? 'long-break' : 'short-break'
        setPhase(nextPhase)
        setSecondsLeft(isLongBreakDue ? longBreakMinutes * 60 : shortBreakMinutes * 60)
        setIsRunning(true)

        if (isLongBreakDue) {
            setSessionsUntilLongBreak(SESSIONS_BEFORE_LONG_BREAK)
        }
    }, [sessionsUntilLongBreak, shortBreakMinutes, longBreakMinutes])

    const isFocusPhase = phase === 'focus'
    const isFreshFocus = isFocusPhase && secondsLeft === focusMinutes * 60

    const statusLabel = (() => {
        if (phase === 'long-break') return 'Long Break'
        if (phase === 'short-break') return 'Short Break'
        if (isRunning) return 'Focusing'
        if (isFreshFocus) return 'Ready'
        return 'Paused'
    })()

    const messageLabel = (() => {
        if (phase === 'long-break') return 'Time to fully recharge.'
        if (phase === 'short-break') return 'Take a quick breath.'
        if (isRunning) return 'Stay in the zone.'
        if (isFreshFocus) return 'A clean slate awaits.'
        return 'Ready when you are.'
    })()

    const primaryLabel = (() => {
        if (!isFocusPhase) return 'Start Focus'
        if (isRunning) return 'Pause'
        if (isFreshFocus) return 'Start Focus'
        return 'Resume'
    })()

    return {
        phase,
        secondsLeft,
        isRunning,
        sessionsCompletedToday,
        focusMinutesToday,
        sessionsUntilLongBreak,
        statusLabel,
        messageLabel,
        primaryLabel,
        formattedTime: formatTime(secondsLeft),
        isoDuration: formatIsoDuration(secondsLeft),
        startOrToggleFocus,
        startBreak,
        focusMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        setFocusMinutes,
        setShortBreakMinutes,
        setLongBreakMinutes
    }
}