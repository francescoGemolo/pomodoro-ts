import { useCallback, useEffect, useState } from 'react'

export type Phase = 'idle' | 'focus' | 'short-break' | 'long-break' | 'paused'

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
    const [focusMinutes, setFocusMinutes] = useState(25)
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5)
    const [longBreakMinutes, setLongBreakMinutes] = useState(15)

    const [phase, setPhase] = useState<Phase>('idle')
    const [previousPhase, setPreviousPhase] = useState<Phase>('focus')
    const [secondsLeft, setSecondsLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [cyclesCompleted, setCyclesCompleted] = useState(0)

    const [sessionsCompletedToday, setSessionsCompletedToday] = useState(0)
    const [focusMinutesToday, setFocusMinutesToday] = useState(0)

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

    useEffect(() => {
        if (secondsLeft !== 0 || isRunning || phase === 'idle' || phase === 'paused') return

        if (phase === 'focus') {
            const nextCycles = cyclesCompleted + 1
            setCyclesCompleted(nextCycles)
            setSessionsCompletedToday((prev) => prev + 1)
            setFocusMinutesToday((prev) => prev + focusMinutes)

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
            setPhase('focus')
            setSecondsLeft(focusMinutes * 60)
            setIsRunning(true)
        }
    }, [secondsLeft, isRunning, phase, cyclesCompleted, focusMinutes, shortBreakMinutes, longBreakMinutes])

    const startOrToggleFocus = useCallback(() => {
        if (phase === 'idle') {
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
        resetTimer,
        focusMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        setFocusMinutes,
        setShortBreakMinutes,
        setLongBreakMinutes
    }
}