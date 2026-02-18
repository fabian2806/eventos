import useEvents from "@/features/events/hooks/useEvents";

const Events = () => {
    
    const {events, loading, error} = useEvents();

    if (loading) return <div className="text-white">Cargando…</div>;
    if (error) return <div className="text-red-300">Error: {error}</div>;
    
    return (
        <section>
            {events.map((ev) => (
                <div className="text-white">
                    <p>{ev.id}</p>
                    <p>{ev.name}</p>
                    <p>{ev.address}</p>
                    <p>{ev.startsAt}</p>
                    <p>{ev.endsAt}</p>
                </div>
            ))}
        </section>
    );
}

export default Events;