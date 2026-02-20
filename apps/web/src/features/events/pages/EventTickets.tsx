import type { EventDetailResponse } from "@/api/types";
import { useOutletContext } from "react-router-dom";
import useEntryTypesEvent from "@/features/events/hooks/useEntryTypesEvent";
import EntryTypeCard from "@/features/events/components/EntryTypeCard";

type Ctx = {numEventId: number; event: EventDetailResponse};

const EventTickets = () => {

    const {numEventId} = useOutletContext<Ctx>();

    const {entryTypes, loading, error} = useEntryTypesEvent(numEventId);

    if (loading) return <div className="text-white">Cargando…</div>;
    if (error) return <div className="text-red-300">Error: {error}</div>;

    return(
        <section className="flex flex-col h-screen items-center">
            <div className="text-center mt-20">
                <h1 className="text-balance text-white font-display font-black 
                    text-6xl md:text-8xl tracking-tight leading-[0.95]">ENTRADAS</h1>
                <p className="max-w-2xl mx-auto text-white/80 font-body text-lg md:text-xl leading-relaxed">
                    La próxima experiencia comienza aquí.</p>
            </div>

            <div className="my-24 w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
                    {entryTypes.map((ent) => (
                        <EntryTypeCard entryType={ent} onClick={() => {console.log("Click!")}} />
                    ))}
                </div>
            </div>

            
        </section>
    );
}

export default EventTickets;