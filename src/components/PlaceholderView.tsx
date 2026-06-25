interface PlaceholderViewProps {
    title: string
    description: string
}

export default function PlaceholderView({ title, description }: PlaceholderViewProps) {
    return (
        <main className="timer-card">
            <section className="timer-panel" aria-label={title}>
                <p className="timer-state">{title}</p>
                <p className="timer-message">{description}</p>
            </section>
        </main>
    )
}