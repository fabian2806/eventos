import useEvents from "@/features/events/hooks/useEvents";
import EventCard from "@/features/events/components/EventCard";

const Events = () => {
    
    const {events, loading, error} = useEvents();

    if (loading) return <div className="text-white">Cargando…</div>;
    if (error) return <div className="text-red-300">Error: {error}</div>;
    
    return (
        <section className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mt-12">
                <h1 className="text-balance text-white font-display font-black 
                    text-6xl md:text-8xl tracking-tight leading-[0.95]">
                    EVENTOS
                </h1>
                <p className="max-w-2xl mx-auto text-white/80 font-body text-lg md:text-xl leading-relaxed">
                    La próxima experiencia comienza aquí.</p>
            </div>

            {/*Sección de cards*/}
            {/*280: 70rem*/}
            <div className="my-8 w-full max-w-280 space-y-16">
                {events.map((ev) => (
                    <EventCard key={ev.id} event={ev}/>
                ))}
                {events.map((ev) => (
                    <EventCard key={ev.id} event={ev}/>
                ))}
                {events.map((ev) => (
                    <EventCard key={ev.id} event={ev}/>
                ))}
            </div>
        </section>
    );
}

export default Events;