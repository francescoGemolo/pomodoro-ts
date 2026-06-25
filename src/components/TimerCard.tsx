import { useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import catAnimation from "../assets/animations/catAnimation.json";

interface TimerCardProps {
    statusLabel: string
    formattedTime: string
    isoDuration: string
    messageLabel: string
    primaryLabel: string
    phase: string
    onPrimaryAction: () => void
    onStartBreak: () => void
    onReset: () => void
}

export default function TimerCard({
    statusLabel,
    formattedTime,
    isoDuration,
    messageLabel,
    primaryLabel,
    phase,
    onPrimaryAction,
    onStartBreak,
    onReset
}: TimerCardProps) {
    const catPlayerRef = useRef<Player>(null);

    useEffect(() => {
        if (!catPlayerRef.current) return;

        if (phase === 'focus') {
            catPlayerRef.current.play();
        } else {
            catPlayerRef.current.pause();
        }
    }, [phase]);

    return (
        <main className={`timer-card card-state-${phase} animate-fade-in`}>
            <section className="timer-layout">

                <div className="timer-panel">
                    <p className="timer-state">{statusLabel}</p>

                    <time className="timer-display" dateTime={isoDuration}>
                        {formattedTime}
                    </time>

                    <p className="timer-message">
                        {messageLabel}
                    </p>

                    <div className="timer-actions">
                        <button
                            type="button"
                            className="btn-primary"
                            onClick={onPrimaryAction}
                        >
                            {primaryLabel}
                        </button>

                        {phase === 'focus' && (
                            <button
                                type="button"
                                className="btn-secondary btn-break"
                                onClick={onStartBreak}
                            >
                                Skip to Break
                            </button>
                        )}

                        {phase !== 'idle' && (
                            <button
                                type="button"
                                className="btn-secondary btn-reset"
                                onClick={onReset}
                            >
                                Reset Session
                            </button>
                        )}
                    </div>
                </div>

                <div className="cat-container">
                    <div className="cat-peek">
                        <Player
                            ref={catPlayerRef}
                            src={catAnimation}
                            loop
                            style={{ height: '300px', width: '300px' }}
                        />
                    </div>
                </div>

            </section>
        </main>
    )
}