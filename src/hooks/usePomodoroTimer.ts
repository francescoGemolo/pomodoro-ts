import { useCallback, useEffect, useState } from 'react'
import {
    FOCUS_SECONDS,
    LONG_BREAK_SECONDS,
    SESSIONS_BEFORE_LONG_BREAK,
    SHORT_BREAK_SECONDS
} from '../constants'

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
    const [phase, setPhase] = useState<Phase>('focus')
    const [secondsLeft, setSecondsLeft] = useState(FOCUS_SECONDS)
    const [isRunning, setIsRunning] = useState(false)
    const [sessionsCompletedToday, setSessionsCompletedToday] = useState(0)
    const [focusMinutesToday, setFocusMinutesToday] = useState(0)
    const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState(SESSIONS_BEFORE_LONG_BREAK)

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
            setFocusMinutesToday((minutes) => minutes + FOCUS_SECONDS / 60)
            setSessionsUntilLongBreak((count) => Math.max(count - 1, 0))
        }

        setIsRunning(false)
        setPhase('focus')
        setSecondsLeft(FOCUS_SECONDS)
    }, [secondsLeft, isRunning, phase])

    const startOrToggleFocus = useCallback(() => {
        if (phase !== 'focus') {
            setPhase('focus')
            setSecondsLeft(FOCUS_SECONDS)
            setIsRunning(true)
            return
        }

        if (isRunning) {
            setIsRunning(false)
            return
        }

        setSecondsLeft((prev) => (prev === 0 ? FOCUS_SECONDS : prev))
        setIsRunning(true)
    }, [phase, isRunning])

    const startBreak = useCallback(() => {
        const isLongBreakDue = sessionsUntilLongBreak === 0

        setPhase(isLongBreakDue ? 'long-break' : 'short-break')
        setSecondsLeft(isLongBreakDue ? LONG_BREAK_SECONDS : SHORT_BREAK_SECONDS)
        setIsRunning(true)

        if (isLongBreakDue) {
            setSessionsUntilLongBreak(SESSIONS_BEFORE_LONG_BREAK)
        }
    }, [sessionsUntilLongBreak])

    const isFocusPhase = phase === 'focus'
    const isFreshFocus = isFocusPhase && secondsLeft === FOCUS_SECONDS

    const statusLabel = (() => {
        if (phase === 'long-break') return 'Pausa lunga'
        if (phase === 'short-break') return 'Pausa breve'
        if (isRunning) return 'Focus'
        if (isFreshFocus) return 'Pronto'
        return 'In pausa'
    })()

    const messageLabel = (() => {
        if (phase === 'long-break') return 'Goditi una pausa lunga, te la sei meritata.'
        if (phase === 'short-break') return 'Stacca per qualche minuto.'
        if (isRunning) return 'Resta concentrato, ci sei quasi.'
        if (isFreshFocus) return 'Un blocco pulito ti sta aspettando.'
        return 'Quando vuoi, riprendi da dove avevi lasciato.'
    })()

    const primaryLabel = (() => {
        if (!isFocusPhase) return 'Avvia focus'
        if (isRunning) return 'Metti in pausa'
        if (isFreshFocus) return 'Avvia focus'
        return 'Riprendi'
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
        startBreak
    }
}